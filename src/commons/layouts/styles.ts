import { css } from 'emotion'
import { aboveBp, spacings, toRem } from 'styles'

const root = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const content = css({
  flex: '1 0 auto',
  margin: '0 auto',
  padding: `${spacings.lg} ${spacings.default}`,
  width: '100%',
  maxWidth: toRem(1024),
  [aboveBp('mobile')]: {
    padding: spacings.lg
  }
})

export const styles = {
  root,
  content
}
