import { flow } from 'fp-ts/lib/function'
import { fromNullable, getOrElse, map as mapOpt } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { ColItem } from './types'

type RowSizeCheck = {
  stringifyContent: string
  aboveMobile: number
  aboveTablet: number
  aboveDesktop: number
}

function checkRowSize(row: ColItem[]): RowSizeCheck {
  return row.reduceRight<RowSizeCheck>(
    (acc, current) => {
      const stringifyContent =
        JSON.stringify(current.content.props, null, 2).substring(0, 200) + '...'

      return {
        stringifyContent: stringifyContent + '\n' + acc.stringifyContent,
        aboveMobile: pipe(
          fromNullable(current.aboveMobile),
          mapOpt(_ => _.col + acc.aboveMobile),
          getOrElse(() => 0)
        ),
        aboveTablet: pipe(
          fromNullable(current.aboveTablet),
          mapOpt(_ => _.col + acc.aboveTablet),
          getOrElse(() => 0)
        ),
        aboveDesktop: pipe(
          fromNullable(current.aboveDesktop),
          mapOpt(_ => _.col + acc.aboveDesktop),
          getOrElse(() => 0)
        )
      }
    },
    {
      stringifyContent: '',
      aboveMobile: 0,
      aboveTablet: 0,
      aboveDesktop: 0
    }
  )
}

function getDebugInfo(rowSizeCheck: RowSizeCheck): void {
  const { stringifyContent, ...rest } = rowSizeCheck
  const stripedRowSizeCheck: Omit<RowSizeCheck, 'stringifyContent'> = rest

  Object.entries(stripedRowSizeCheck).forEach(
    ([key, size]) =>
      size > 12 &&
      console.error(
        `in AsymGrid component, a row should not contain more than 12 col, you have ${size}. Please check your ${key} declaration for this row: ${stringifyContent}`
      )
  )
}

export const debugLog = flow(
  checkRowSize,
  getDebugInfo
)
