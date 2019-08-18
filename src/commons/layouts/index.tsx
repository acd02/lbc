import 'react-toastify/dist/ReactToastify.min.css'

import * as React from 'react'
import { ToastContainer } from 'react-toastify'

import { Nav } from '/commons/organisms/nav'

import { styles } from './styles'

export function Main(props: React.Props<{}>) {
  return (
    <div className={styles.root}>
      <Nav hasBorder={true} />
      <div className={styles.content}>{props.children}</div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}
