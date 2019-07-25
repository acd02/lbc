import { css } from 'emotion'
import { shade } from 'polished'

import { colors, spacings, fontSizes } from 'styles'

const toast = (isPublic: boolean) =>
  css({
    backgroundColor: `${colors[isPublic ? 'primary' : 'secondary']} !important`
  })

const messageRoot = css({
  position: 'relative',
  marginBottom: spacings.md,
  padding: `${spacings.xl} ${spacings.sm}`,
  whiteSpace: 'pre-line',
  backgroundColor: shade(0.2, colors.primary),
  color: '#fff',
  borderRadius: '4px'
})

const info = css({
  position: 'absolute',
  bottom: '4px',
  right: '4px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  fontSize: fontSizes.sm
})

const messageLabel = (isPublic: boolean) =>
  css({
    marginRight: spacings.xs,
    padding: spacings.xs,
    backgroundColor: shade(0.1, '#fff'),
    color: isPublic ? shade(0.3, colors.primary) : shade(0.2, colors.secondary),
    borderRadius: '2px'
  })

const closeIcon = css({
  position: 'absolute',
  top: '4px',
  right: '4px',
  cursor: 'pointer'
})

const revealIcon = css({
  margin: 'auto',
  cursor: 'pointer'
})

export const styles = {
  toast,
  messageRoot,
  messageLabel,
  closeIcon,
  revealIcon,
  info
}
