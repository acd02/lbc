import { toRem } from './utils'

const defaultValue = 16

export const fontSizes = {
  default: toRem(16),
  xs: toRem(defaultValue / 2),
  sm: toRem(defaultValue / 1.2),
  md: toRem(defaultValue * 2),
  lg: toRem(defaultValue * 3),
  xl: toRem(defaultValue * 4)
}
