import cx from 'classnames'
import { css } from 'emotion'

import { aboveBp, animations, toRem } from '/styles'

const setSize = (val: number) =>
  css({
    '&::after': {
      width: toRem(val),
      height: toRem(val)
    }
  })

const justifyMapping = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

const setJustify = (val: 'left' | 'center' | 'right') =>
  css({
    justifyContent: 'center',
    [aboveBp('mobile')]: {
      justifyContent: justifyMapping[val]
    }
  })

const spinner = cx(
  setSize(16),
  css({
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    position: 'relative',
    '&:after': {
      animation: `${animations.spinAround} 500ms linear infinite`,
      display: 'block',
      border: '2px solid #dbdbdb',
      borderRadius: '50%',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      content: "''" // eslint-disable-line quotes
    }
  })
)

export const styles = {
  spinner,
  setJustify,
  setSize
}
