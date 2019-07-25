import * as React from 'react'
import { css } from 'emotion'
import cx from 'classnames'

import { flexContainer, aboveBp, spacings } from 'styles'
import { Breakpoint } from 'styles/breakpoints'
import { Spacing } from 'styles/spacings'

type Col = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type SymCol = {
  col: Col
  above?: Breakpoint
  gutter?: Spacing
}

export type Props = {
  children: React.ReactNode
  cols: SymCol[]
  className?: string
}

export function makeSymGrid(props: Props) {
  const { cols, className, children } = props
  const symColClasses: string = cols
    .map(c => {
      const { col, above, gutter } = c
      const breakpoint = above || 'mobile'
      const gutterValue = gutter ? spacings[gutter] : spacings.default

      return css({
        [aboveBp(breakpoint)]: {
          '>*': {
            width: `calc(99.99% * 1/${col} - (${gutterValue} - ${gutterValue} * 1/${col}))`
          },
          '&>*:nth-of-type(n)': {
            marginRight: gutterValue
          },
          [`&>*:nth-of-type(${col}n+${col})`]: {
            marginRight: 0
          }
        }
      })
    })
    .join(' ')

  return <div className={cx(symColClasses, flexContainer, className)}>{children}</div>
}
