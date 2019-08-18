import cx from 'classnames'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { CSSAnimate } from '/commons/atoms/animate'
import { ExternalClick } from '/commons/atoms/externalClick'
import { easings, makeAnimation } from '/styles'

import { styles } from './styles'

const timeout = 200

type Props = {
  showModal: boolean
  onClose: () => void
  onProceed: () => void
  closeLabel?: string
  proceedLabel?: string
}

const enteringAnimation = makeAnimation({
  name: 'fadeIn',
  duration: timeout,
  fillMode: 'forwards',
  easing: easings.easeOutQuint
})

const exitingAnimation = makeAnimation({
  name: 'fadeOut',
  duration: timeout,
  fillMode: 'forwards',
  easing: easings.easeOutQuint
})

export function Modal(props: Props & React.Props<{}>) {
  const modalRoot = document.getElementById('modal')

  React.useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const { top } = body.getBoundingClientRect()

    if (props.showModal) {
      html.classList.add(styles.noScroll)
      body.classList.add(styles.noScroll)
      /* eslint-disable-next-line fp/no-mutation */
      html.style.top = `${top}px`
    } else {
      html.classList.remove(styles.noScroll)
      body.classList.remove(styles.noScroll)
      window.scroll(0, top * -1)
    }
  }, [props.showModal])

  const { children, showModal, closeLabel = 'close', proceedLabel = 'proceed' } = props

  return (
    <CSSAnimate
      onEnterClassName={() => enteringAnimation}
      onExitClassName={() => exitingAnimation}
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
