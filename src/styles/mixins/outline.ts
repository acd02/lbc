import { css } from 'emotion'

export const outline = css({
  '&:hover': {
    outline: 'none'
  },
  '&:not(:hover)': {
    outlineWidth: '1px'
  }
})
