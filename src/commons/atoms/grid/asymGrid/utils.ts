import { fromNullable, map as mapOpt, toUndefined, getOrElse } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { sort } from 'fp-ts/lib/Array'

import { compact } from 'utils/array'
import { breakpoints, Breakpoint } from 'styles/breakpoints'
import { Spacing } from 'styles/spacings'

import { ColItem, Col } from './makeAsymGrid'

type AsymCol = {
  col: Col
  above?: Breakpoint
  gutter?: Spacing
}

export type StripedAsymCol = Omit<AsymCol, 'above'>
export type StripedColWithBp = StripedAsymCol & { above?: Breakpoint }

function withBreakPoint(col: StripedAsymCol, bp: Breakpoint): StripedColWithBp {
  return { ...col, above: bp }
}

export function addBreakpointsToColItem(col: ColItem): StripedColWithBp[] {
  return compact([
    pipe(
      fromNullable(col.aboveMobile),
      mapOpt(_ => withBreakPoint(_, 'mobile')),
      toUndefined
    ),
    pipe(
      fromNullable(col.aboveTablet),
      mapOpt(_ => withBreakPoint(_, 'tablet')),
      toUndefined
    ),
    pipe(
      fromNullable(col.aboveDesktop),
      mapOpt(_ => withBreakPoint(_, 'desktop')),
      toUndefined
    )
  ])
}

const bpOrder = contramap((x: StripedColWithBp) =>
  parseInt(x.above ? breakpoints[x.above] : '0', 10)
)(ordNumber)

export function sortColsByBp(cols: StripedColWithBp[]) {
  return sort(bpOrder)(cols)
}

export function betweenBp(bp: Breakpoint, maybeNextBp?: Breakpoint) {
  return pipe(
    fromNullable(maybeNextBp),
    mapOpt(
      nextBp =>
        `@media(min-width: ${breakpoints[bp]}) and (max-width: ${breakpoints[nextBp]})`
    ),
    getOrElse(() => `@media(min-width: ${breakpoints[bp]})`)
  )
}
