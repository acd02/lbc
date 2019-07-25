import { styles } from './styles'

import * as React from 'react'
import dayjs from 'dayjs'

import { Icon } from 'commons/atoms/icon'
import { Eye, Close } from 'commons/svg'

import { MessageWithID } from 'shared/model'

type Props = {
  messsage: MessageWithID
  onClick: (message: MessageWithID) => void
  onRemove: (message: MessageWithID) => void
}

function _RenderMessage(props: Props) {
  const { messsage } = props
  function handleClick() {
    props.onClick(props.messsage)
  }

  function handleRemove() {
    props.onRemove(props.messsage)
  }

  return (
    <div className={styles.messageRoot}>
      <Icon
        onClick={handleRemove}
        svg={Close}
        color="#eee"
        className={styles.closeIcon}
      />
      <span>{messsage.message}</span>
      <div className={styles.info}>
        <span className={styles.messageLabel(messsage.label === 'public')}>
          {messsage.label}
        </span>
        <span>
          {dayjs(messsage.timestamp).format('DD/MM')}
          {' @'}
          {dayjs(messsage.timestamp).format('HH:mm')}
        </span>
      </div>
      {messsage.label === 'private' && !messsage.contentHasBeenRevealed && (
        <Icon
          onClick={handleClick}
          svg={Eye}
          color="#fff"
          className={styles.revealIcon}
        />
      )}
    </div>
  )
}

export const RenderMessage = React.memo(_RenderMessage)
