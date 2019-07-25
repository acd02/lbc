import { css } from 'emotion'

import { spacings, colors, fontSizes } from 'styles'

function setRoot({ hasBorder }: { hasBorder: boolean }) {
  return css({
    flex: 'none',
    width: '100%',
    padding: `${spacings.lg} 0`,
    borderBottom: hasBorder ? `2px solid ${colors.primary}` : '',
    textAlign: 'center',
    h1: {
      marginBottom: spacings.md,
      fontSize: fontSizes.lg,
      fontWeight: 500
    }
  })
}

const info = css({
  color: colors.grey
})

export const styles = {
  setRoot,
  info
}
