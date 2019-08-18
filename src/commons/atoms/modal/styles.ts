import { css } from 'emotion'

import { animations, colors, easings, spacings } from '/styles'

const root = css({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(10, 10, 10, 0.46)'
})

const noScroll = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  height: 'auto',
  overflowY: 'hidden'
})

const content = css({
  position: 'relative',
  minWidth: '325px',
  maxWidth: '1024px',
  margin: `0 ${spacings.default}`,
  padding: `${spacings.md}`,
  backgroundColor: '#fff',
  borderRadius: '6px',
  animation: `${animations.slideDown} 250ms ${easings.easeOutQuint}`
})

const onExit = css({
  animation: `${animations.slideUp} 250ms ${easings.easeOutQuint}`
})

const actions = css({
  position: 'relative',
  left: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: spacings.xl,
  '> span': {
    textTransform: 'uppercase',
    cursor: 'pointer'
  }
})

const proceedLabel = css({
  marginRight: spacings.default,
  color: colors.primary
})

const closeLabel = css({
  color: colors.grey
})

export const styles = {
  root,
  content,
  noScroll,
  actions,
  proceedLabel,
  closeLabel,
  onExit
}
