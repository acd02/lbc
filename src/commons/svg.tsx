/* eslint max-len: 0 */
import * as React from 'react'

export const Add = (color: string) => (
  <svg
    fill={color}
    style={{ display: 'block' }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
)

export const Minus = (color: string) => (
  <svg
    fill={color}
    style={{ display: 'block' }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19,13H5V11H19V13Z" />
  </svg>
)

export const Close = (color: string) => (
  <svg
    fill={color}
    style={{ display: 'block' }}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
  </svg>
)

export const Eye = (color: string) => (
  <svg fill={color} style={{ display: 'block' }} viewBox="0 0 24 24">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5.36 0 .72 0 1.08-.05a6.09 6.09 0 0 1-.08-.95c0-.36.04-.72.1-1.08-.36.04-.73.08-1.1.08-3.76 0-7.17-2.14-8.82-5.5a9.821 9.821 0 0 1 17.64 0c-.12.24-.26.45-.39.68.66.16 1.29.43 1.86.82.27-.5.51-1 .71-1.5-1.73-4.39-6-7.5-11-7.5M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m6 5.5v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
  </svg>
)
