import { makeAsymGrid, Props } from './makeAsymGrid'

export function AsymGrid(props: Props) {
  const { rows, rootClassName, commonRowStyles, commonColStyles } = props

  return makeAsymGrid({ rows, rootClassName, commonRowStyles, commonColStyles })
}

export { Row } from './types'
