import { makeSymGrid, Props } from './makeSymGrid'

export function SymGrid(props: Props) {
  const { cols, children, className } = props

  return makeSymGrid({ cols, children, className })
}
