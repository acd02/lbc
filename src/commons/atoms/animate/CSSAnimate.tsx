import { sequenceT } from 'fp-ts/lib/Apply'
import { fromNullable, map as mapOpt, option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'

import { Animate } from './Animate'

type CSSAnimateProps = {
  onEnterClassName?: () => string
  onExitClassName?: () => string
  onExited?: (el: HTMLElement) => void
  toggle: boolean
  appear?: boolean
  timeout: number
  children: React.ReactNode
}

const optionSequence = sequenceT(option)

export function CSSAnimate(props: CSSAnimateProps) {
  const { onEnterClassName, onExitClassName } = props
  // we store these two classNames here,
  // to avoid having some jss lib re-generate the <style> tag inside the head
  // on the fly everytime, potentially leading to some visual glitches
  const maybeEnterClassName = pipe(
    fromNullable(onEnterClassName),
    mapOpt(onEnter => onEnter())
  )
  const maybeExitClassName = pipe(
    fromNullable(onExitClassName),
    mapOpt(onExit => onExit())
  )

  const { onExited, children, toggle, appear, timeout } = props

  /**
   *
   * 1. the onEnter and onExit should normally be called with the 'element',
   *    but there are some edge cases where it's not the case,
   *    thus, we wrap it inside an Option
   */
  return (
    <Animate
      toggle={toggle}
      onEnter={maybeEl => {
        /* 1 */
        pipe(
          optionSequence(maybeEnterClassName, fromNullable(maybeEl)),
          mapOpt(([enterCls, el]) => {
            el.classList.add(enterCls)
            pipe(
              maybeExitClassName,
              mapOpt(exitCls => el.classList.remove(exitCls))
            )
          })
        )
      }}
      onExit={maybeEl => {
        /* 1 */
        pipe(
          optionSequence(maybeExitClassName, fromNullable(maybeEl)),
          mapOpt(([exitCls, el]) => {
            el.classList.add(exitCls)
            pipe(
              maybeEnterClassName,
              mapOpt(enterCls => el.classList.remove(enterCls))
            )
          })
        )
      }}
      onExited={onExited}
      timeout={timeout}
      appear={appear}
    >
      {children}
    </Animate>
  )
}
