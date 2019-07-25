import { css } from 'emotion'
import { tint } from 'polished'

import { spacings, colors, fontSizes } from 'styles'

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
    color: '#fff'
  })

export const styles = {
  root,
  switchSection,
  switchLabel,
  submitBtn,
  textArea,
  charactersCountBlock
}
