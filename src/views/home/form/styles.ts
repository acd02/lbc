import { css } from 'emotion'
import { tint } from 'polished'

import { colors, fontSizes, spacings } from '/styles'

const root = css({
  maxWidth: '600px'
})

const switchSection = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  margin: `${spacings.md} auto`,
  '& > span': {
    marginLeft: spacings.sm
  }
})

const switchLabel = (isPublic: boolean) =>
  css({
    color: isPublic ? colors.primary : colors.secondary
  })

const textArea = css({
  marginBottom: spacings.sm
})

const submitBtn = css({
  borderRadius: '4px'
})

const charactersCountBlock = (hasReachedLimit: boolean) =>
  css({
    display: 'inline-block',
    marginBottom: spacings.lg,
    padding: `${spacings.xs} ${spacings.sm}`,
    fontSize: fontSizes.sm,
    backgroundColor: tint(0.2, colors[hasReachedLimit ? 'error' : 'primary']),
    color: '#fff',
    fontFeatureSettings: '"tnum"', // text doesn't move thanks to this property
    fontVariantNumeric: 'tabular-nums' // and this one also
  })

export const styles = {
  root,
  switchSection,
  switchLabel,
  submitBtn,
  textArea,
  charactersCountBlock
}
