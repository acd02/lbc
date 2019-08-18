import { Breakpoint } from '/styles/breakpoints'
import { Spacing } from '/styles/spacings'

type AsymCol = {
  col: Col
  above?: Breakpoint
  gutter?: Spacing
}

export type Col = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type ColItem = {
  content: React.ReactElement
  className?: string
  aboveMobile?: StripedAsymCol
  aboveTablet?: StripedAsymCol
  aboveDesktop?: StripedAsymCol
}

export type Row = {
  className?: string
  firstCol: ColItem
  secondCol?: ColItem
  thirdCol?: ColItem
  fourthCol?: ColItem
  fifthCol?: ColItem
}

export type StripedAsymCol = Omit<AsymCol, 'above'>
export type StripedColWithBp = StripedAsymCol & { above?: Breakpoint }
