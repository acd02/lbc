import * as React from 'react'
import * as ReactTransition from 'react-transition-group'

import { makeAnimation } from 'styles'
import { useIsInitialMount } from 'utils/hooks'

type Props<T> = {
  list: T[]
  timeout: number
  placeholder?: React.ReactElement<{}>
  setKey: (item: T) => string | number
  renderItem: (item: T) => React.ReactElement<{}>
  onEnter?: (el: HTMLElement, index: number) => void
  onExit?: (el: HTMLElement, index: number) => void
  appear?: boolean
}

type ReactTransitionClassNames = {
  onEnter?: string
  onExit?: string
}

export function AnimateList<T>(props: Props<T>) {
  const [showPlaceholder, setPlaceholder] = React.useState<boolean>(false)
  const isInitialMount = useIsInitialMount()

  React.useEffect(() => {
    !props.list.length && setPlaceholder(true)
  }, [])

  React.useEffect(() => {
    !isInitialMount && props.list.length && setPlaceholder(false)
  }, [props.list])

  const {
    list,
    timeout,
    setKey,
    renderItem,
    onEnter,
    onExit,
    appear = true,
    placeholder = <span>nothing</span>
  } = props

  // this empty "classNames" object is used as a placeholder,
  // because it is required inside the "CSSTransition" component
  const classNames: ReactTransitionClassNames = {}

  return showPlaceholder ? (
    <span
      className={makeAnimation({
        name: 'fadeIn',
        duration: 350,
        fillMode: 'forwards'
      })}
    >
      {placeholder}
    </span>
  ) : (
    <ReactTransition.TransitionGroup component={null} appear={appear}>
      {list.map((item: T, index) => (
        <ReactTransition.CSSTransition
          timeout={timeout}
          key={setKey(item)}
          onEnter={onEnter ? el => onEnter(el, index) : undefined}
          onExit={onExit ? el => onExit(el, index) : undefined}
          onExited={() => {
            // the last item is about to be removed
            list.length === 1 && setPlaceholder(true)
          }}
          classNames={{
            enterActive: classNames.onEnter,
            exitActive: classNames.onExit
          }}
        >
          {renderItem(item)}
        </ReactTransition.CSSTransition>
      ))}
    </ReactTransition.TransitionGroup>
  )
}
