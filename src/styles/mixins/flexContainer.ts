import { css } from 'emotion'

export const flexContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
  '&>*': {
    width: '100%'
  }
})
