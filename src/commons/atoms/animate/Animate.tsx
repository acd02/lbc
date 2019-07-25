import * as React from 'react'
import * as ReactTransition from 'react-transition-group'

type AnimateProps = {
  onEnter?: (el: HTMLElement) => void
  onExit?: (el: HTMLElement) => void
  onExited?: (el: HTMLElement) => void
  toggle: boolean
  appear?: boolean
  timeout: number
  children: React.ReactNode
}

export function Animate(props: AnimateProps) {
  const { onEnter, onExit, onExited, timeout, toggle, children, appear = false } = props

  return (
    <ReactTransition.Transition
      in={toggle}
      appear={appear}
      onEnter={onEnter}
      onExit={onExit}
      onExited={onExited}
      timeout={timeout}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <>{children}</>
    </ReactTransition.Transition>
  )
}
