import { styles } from './styles'

import * as React from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import { CSSAnimate } from 'commons/atoms/animate'
import { ExternalClick } from 'commons/atoms/externalClick'
import { makeAnimation, easings } from 'styles'

const timeout = 200

type Props = {
  showModal: boolean
  onClose: () => void
  onProceed: () => void
  closeLabel?: string
  proceedLabel?: string
}

export function Modal(props: Props & React.Props<{}>) {
  const modalRoot = document.getElementById('modal')

  function handleScrolling() {
    const html = document.documentElement
    const body = document.body
    const { top } = body.getBoundingClientRect()

    if (props.showModal) {
      html.classList.add(styles.noScroll)
      body.classList.add(styles.noScroll)
      html.style.top = `${top}px`
    } else {
      html.classList.remove(styles.noScroll)
      body.classList.remove(styles.noScroll)
      window.scroll(0, top * -1)
    }
  }

  const { children, showModal, closeLabel = 'close', proceedLabel = 'proceed' } = props

  handleScrolling()

  return (
    <CSSAnimate
      onEnterClassName={() =>
        makeAnimation({
          name: 'fadeIn',
          duration: timeout,
          fillMode: 'forwards',
          easing: easings.easeOutQuint
        })
      }
      onExitClassName={() =>
        makeAnimation({
          name: 'fadeOut',
          duration: timeout,
          fillMode: 'forwards',
          easing: easings.easeOutQuint
        })
      }
      appear={true}
      timeout={timeout}
      toggle={showModal}
    >
      {createPortal(
        <div className={styles.root}>
          <ExternalClick onExternalClick={props.onClose}>
            <div className={cx(styles.content, !showModal && styles.onExit)}>
              {children}
              <div className={styles.actions}>
                <span className={styles.proceedLabel} onClick={props.onProceed}>
                  {proceedLabel}
                </span>
                <span className={styles.closeLabel} onClick={props.onClose}>
                  {closeLabel}
                </span>
              </div>
            </div>
          </ExternalClick>
        </div>,
        modalRoot as HTMLElement
      )}
    </CSSAnimate>
  )
}
