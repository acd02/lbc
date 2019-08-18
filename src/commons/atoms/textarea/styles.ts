import { css } from 'emotion'

import { colors, easings } from '/styles'

const wrapper = css({
  position: 'relative'
})

/**
 * HACK: Firefox
 *
 * 1. otherwise, the border won't be visible
 */

const root = css({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: "''", // eslint-disable-line quotes
    position: 'absolute',
    top: 'calc(100% - 2px)',
    left: 0,
    right: 0,
    zIndex: 1 /* 1 */,
    height: '1px',
    backgroundColor: 'rgba(0,0,0,0.12)'
  },
  '&::after': {
    transition: `transform 0.25s ${easings.easeInOutQuart}`,
    content: "''", // eslint-disable-line quotes
    position: 'absolute',
    top: 'calc(100% - 2px)',
    left: 0,
    right: 0,
    height: '1px',
    transform: 'translateX(-100%)',
    backgroundColor: colors.primary
  }
})

const isFocused = css({
  '&::after': {
    zIndex: 1 /* 1 */,
    transform: 'translateX(0)'
  }
})

const textArea = css({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  height: '30px',
  padding: '0',
  overflowY: 'hidden',
  resize: 'none',
  boxShadow: 'none',
  outline: 'none',
  border: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit'
})

const clone = css({
  visibility: 'hidden',
  position: 'absolute',
  paddingBottom: '10px',
  top: 0,
  left: 0,
  right: 0,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  borderBottom: '1px solid',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit'
})

const errorsBlock = css({
  right: '0'
})

export const styles = {
  wrapper,
  textArea,
  clone,
  root,
  isFocused,
  errorsBlock
}
