import { css } from 'emotion'

import { colors, spacings, fontSizes } from 'styles'

function setRoot({ isSecondary }: { isSecondary: boolean }) {
  return css({
    backgroundColor: isSecondary ? colors.secondary : colors.primary,
    padding: `${spacings.sm} ${spacings.default}`,
    fontSize: fontSizes.default,
    color: '#fff',
    cursor: 'pointer'
  })
}

const isDisabled = css({
  opacity: 0.8,
  cursor: 'not-allowed !important'
})

export const styles = {
  setRoot,
  isDisabled
}
