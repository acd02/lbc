import { css } from 'emotion'
import * as React from 'react'

import { AnimateList } from '/commons/atoms/animate'
import { MessageWithID } from '/shared/model'
import { colors, easings, makeAnimation } from '/styles'

import { RenderMessage } from './renderMessage'

const timeout = 350

type Props = {
  messages: MessageWithID[]
  onClick: (message: MessageWithID) => void
  onRemove: (message: MessageWithID) => void
}
export function RenderMessages(props: Props) {
  const { messages, onClick, onRemove } = props

  return (
    <AnimateList
      list={messages}
      timeout={timeout}
      appear={true}
      placeholder={
        <span className={css({ color: colors.grey })}>No messages to display yet 😕</span>
      }
      onEnter={(el, i) =>
        el.classList.add(
          makeAnimation({
            name: 'slideDown',
            duration: timeout,
            easing: easings.easeOutBack,
            delay: i * 20,
            fillMode: 'both'
          })
        )
      }
      onExit={el =>
        el.classList.add(
          makeAnimation({
            name: 'fadeOut',
            duration: timeout,
            fillMode: 'forwards'
          })
        )
      }
      setKey={message => message.id}
      renderItem={message => (
        <RenderMessage messsage={message} onRemove={onRemove} onClick={onClick} />
      )}
    />
  )
}
