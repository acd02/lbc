import { css, keyframes } from 'emotion'
import { colors } from 'styles'

const slideDown = keyframes({
  '0%': {
    transform: 'translateY(-20%)',
    opacity: 0
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1
  }
})

const root = css({
  position: 'absolute',
  top: 'calc(100% + 2px)',
  maxWidth: '400px',
  fontSize: '12px',
  color: colors.error
})

export const styles = {
  slideDown,
  root
}
