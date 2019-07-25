import { styles } from './styles'

import * as React from 'react'

type Props = {
  hasBorder: boolean
}

export function Nav(props: Props) {
  const { hasBorder } = props

  return (
    <div className={styles.setRoot({ hasBorder })}>
      <h1>Hello 👋</h1>
      <p className={styles.info}>You can use the form below to publish your messages!</p>
    </div>
  )
}
