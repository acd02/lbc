import { toRem } from './utils'

const defaultValue = 16

export const spacings = {
  default: toRem(defaultValue),
  xs: toRem(defaultValue / 4),
  sm: toRem(defaultValue / 2),
  md: toRem(defaultValue * 1.5),
  lg: toRem(defaultValue * 2),
  xl: toRem(defaultValue * 2.5),
  xxl: toRem(defaultValue * 3.5)
}

export type Spacing = keyof typeof spacings
