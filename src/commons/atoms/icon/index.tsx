import cx from 'classnames'
import * as React from 'react'

import { styles } from './styles'

type Props = {
  svg: (color: string) => React.ReactElement<{}>
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  size?: number
  color?: string
  className?: string
  tabIndex?: number
}

export function Icon(props: Props) {
  const {
    className: classNameProp,
    size = 24,
    color = '#333',
    svg,
    onClick,
    onKeyDown,
    tabIndex
  } = props

  const className = cx(styles, classNameProp)

  return (
    <span
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      className={className}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {svg(color)}
    </span>
  )
}
