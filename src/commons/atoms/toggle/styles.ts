import cx from 'classnames'
import { css } from 'emotion'
import { tint } from 'polished'

import { colors, outline } from '/styles'

const root = cx(
  css({
    display: 'inline-block'
  }),
  outline
)

const input = css({
  display: 'none'
})

function setLabel({ isChecked }: { isChecked: boolean }) {
  return css({
    position: 'relative',
    display: 'block',
    width: '44px',
    height: '20px',
    background: isChecked ? tint(0.5, colors.secondary) : '#898989',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',

    '&::after': {
      position: 'absolute',
      left: '0',
      top: '-3px',
      display: 'block',
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      background: isChecked ? colors.secondary : '#eee',
      boxShadow: '0px 3px 3px rgba(0,0,0,0.05)',
      content: '""',
      transform: isChecked ? 'translate3d(20px, 0, 0)' : 'translate3d(-2px, 0, 0)',
      transition: 'transform 0.3s ease, background 0.3s ease'
    }
  })
}

export const styles = {
  input,
  root,
  setLabel
}
