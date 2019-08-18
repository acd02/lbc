import { sort } from 'fp-ts/lib/Array'
import { fromNullable, getOrElse, map as mapOpt, toUndefined } from 'fp-ts/lib/Option'
import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { Breakpoint, breakpoints } from '/styles/breakpoints'
import { compact } from '/utils/array'

import { ColItem, StripedAsymCol, StripedColWithBp } from './types'

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
