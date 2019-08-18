import cx from 'classnames'
import { css } from 'emotion'

import { colors, fontSizes, outline, spacings } from '/styles'

function setRoot({ isSecondary }: { isSecondary: boolean }) {
  return cx(
    css({
      backgroundColor: isSecondary ? colors.secondary : colors.primary,
      padding: `${spacings.sm} ${spacings.default}`,
      fontSize: fontSizes.default,
      color: '#fff',
      cursor: 'pointer'
    }),
    outline
  )
}

const isDisabled = css({
  opacity: 0.8,
  cursor: 'not-allowed !important'
})

export const styles = {
  setRoot,
  isDisabled
}
