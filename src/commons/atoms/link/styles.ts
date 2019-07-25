import { css } from 'emotion'
import { colors } from 'styles'

function setRoot({ isActive }: { isActive: boolean }) {
  return css({
    display: 'inline-block',
    borderBottom: `2px solid ${isActive ? colors.primary : colors.grey}`,
    color: isActive ? colors.primary : colors.text
  })
}

export const styles = {
  setRoot
}
