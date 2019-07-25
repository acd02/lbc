import { styles } from './styles'

import * as React from 'react'
import { Link as _Link } from '@reach/router'
import cx from 'classnames'
import { Routes } from 'routes'

type Props = {
  label: string
  destination: Routes
  className?: string
}

export function Link(props: Props) {
  const { label, destination, className: classNameProp } = props

  return (
    <_Link
      to={destination}
      getProps={linkProps => ({
        className: cx(styles.setRoot({ isActive: linkProps.isCurrent }), classNameProp)
      })}
    >
      {label}
    </_Link>
  )
}
