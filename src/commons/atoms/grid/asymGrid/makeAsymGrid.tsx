import cx from 'classnames'
import { css } from 'emotion'
import { lookup } from 'fp-ts/lib/Array'
import { map as mapOpt, toUndefined } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'

import { flexContainer, spacings } from '/styles'
import { Breakpoint } from '/styles/breakpoints'
import { compact } from '/utils/array'
import { omitKeys } from '/utils/object'

import { debugLog } from './debug'
import { ColItem, Row, StripedColWithBp } from './types'
import { addBreakpointsToColItem, betweenBp, sortColsByBp } from './utils'

export type Props = {
  rows: Row[]
  rootClassName?: string
  commonRowStyles?: string
  commonColStyles?: string
}

function makeColumnClasses(
  column: StripedColWithBp,
  isLastCol: boolean,
  maybeNextBp?: Breakpoint
): string {
  const { gutter, above } = column
  const formattedRatio = ((column.col / 12) * 100).toFixed(5)
  const breakpoint = above || 'mobile'
  const gutterValue = gutter ? spacings[gutter] : spacings.default

  return css({
    [betweenBp(breakpoint, maybeNextBp)]: {
      width: `calc(99.99% * ${formattedRatio}/100 - (${gutterValue} - ${gutterValue} * ${formattedRatio}/100))`,
      marginRight: isLastCol ? 0 : gutterValue
    }
  })
}

type MakeColumnProp = {
  column: ColItem
  commonColStyles?: string
  colIndex: number
  rowColumnsLength: number
}

function makeColumn(props: MakeColumnProp) {
  const { column, commonColStyles, colIndex, rowColumnsLength } = props
  const colItemsWithBreakpoints = addBreakpointsToColItem(column)

  const columnClasses = sortColsByBp(colItemsWithBreakpoints).map((col, index, self) =>
    makeColumnClasses(
      col,
      colIndex + 1 === rowColumnsLength,
      pipe(
        lookup(index + 1, self),
        mapOpt(c => c.above),
        toUndefined
      )
    )
  )

  return (
    <div
      key={colIndex}
      className={cx(columnClasses.join(' '), column.className, commonColStyles)}
    >
      {column.content}
    </div>
  )
}

function makeRow(
  row: Row,
  index: number,
  commonRowStyles?: string,
  commonColStyles?: string
) {
  const rowColumns = compact(Object.values(omitKeys(row, 'className')))
  const rowContent = rowColumns.map((column, colIndex) =>
    makeColumn({ column, colIndex, rowColumnsLength: rowColumns.length, commonColStyles })
  )

  debugLog(rowColumns) // debugging

  return (
    <div key={index} className={cx(flexContainer, commonRowStyles, row.className)}>
      {rowContent}
    </div>
  )
}

export function makeAsymGrid(props: Props) {
  const { rows, rootClassName, commonRowStyles, commonColStyles } = props

  return (
    <div className={cx(flexContainer, rootClassName)}>
      {rows.map((r, i) => makeRow(r, i, commonRowStyles, commonColStyles))}
    </div>
  )
}
