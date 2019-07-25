import { breakpoints, Breakpoint } from './breakpoints'

export function toRem(num: number): string {
  return `${num / 16}rem`
}

export function aboveBp(bp: Breakpoint) {
  return `@media(min-width: ${breakpoints[bp]})`
}

export function belowBp(bp: Breakpoint) {
  return `@media(min-width: ${breakpoints[bp]})`
}
