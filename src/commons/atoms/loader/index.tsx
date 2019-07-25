import { styles } from './styles'
import { makeAnimation } from 'styles'

import cx from 'classnames'
import * as React from 'react'

import { CSSAnimate } from 'commons/atoms/animate'

const timeout = 350

type Props = {
  children?: React.ReactElement<{}>
  size?: 'small' | 'medium' | 'large'
  justify?: 'left' | 'center' | 'right'
}

export function Loader(props: Props) {
  const { children, size = 'small', justify = 'center' } = props

  const spinnerClassName = cx(
    styles.spinner,
    styles.setJustify(justify),
    size === 'medium' && styles.setSize(32),
    size === 'large' && styles.setSize(48)
  )

  return (
    <>
      {!children && <span className={spinnerClassName} />}
      <CSSAnimate
        toggle={children !== undefined}
        timeout={timeout}
        onEnterClassName={() =>
          makeAnimation({
            name: 'fadeIn',
            duration: timeout,
            fillMode: 'forwards'
          })
        }
      >
        {children}
      </CSSAnimate>
    </>
  )
}
