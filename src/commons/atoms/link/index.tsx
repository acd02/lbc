import { Link as _Link } from '@reach/router'
import cx from 'classnames'
import * as React from 'react'

import { Routes } from '/routes'

import { styles } from './styles'

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
