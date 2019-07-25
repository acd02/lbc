import { styles } from './styles'

import cx from 'classnames'
import * as React from 'react'

type Props = {
  label: React.ReactElement<{}> | string
  className?: string
  isSecondary?: boolean
  onClick?: (e: React.MouseEvent) => void
  isSubmitBtn?: boolean
  isDisabled?: boolean
}

export function Button(props: Props) {
  const {
    className: classNameProp,
    onClick,
    label,
    isSecondary = false,
    isSubmitBtn,
    isDisabled
  } = props

  const className = cx(
    styles.setRoot({ isSecondary }),
    isDisabled && styles.isDisabled,
    classNameProp
  )

  return (
    <button
      disabled={props.isDisabled}
      type={isSubmitBtn ? 'submit' : 'button'}
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
