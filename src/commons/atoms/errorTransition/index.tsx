import cx from 'classnames'
import { css } from 'emotion'
import * as React from 'react'

import { CSSAnimate } from '../animate'
import { styles } from './styles'

const timeout = 250

type Props = {
  toggle: boolean
  className?: string
}

export function ErrorTransition(props: Props & React.Props<{}>) {
  const { children, toggle } = props

  return (
    <CSSAnimate
      onEnterClassName={() =>
        css({
          animation: `${styles.slideDown} ${timeout}ms ease-in`
        })
      }
      appear={true}
      timeout={timeout}
      toggle={toggle}
    >
      <div className={cx(styles.root, props.className)}>{children}</div>
    </CSSAnimate>
  )
}
