import * as React from 'react'
import { css } from 'emotion'
import { pipe } from 'fp-ts/lib/pipeable'
import { map as mapOpt, toUndefined, none, some, Option } from 'fp-ts/lib/Option'

import { MatchProps } from 'routes'
import { Loader } from 'commons/atoms/loader'
import { Modal } from 'commons/atoms/modal'
import { useMemoizedCallback } from 'utils/hooks'
import { MessageWithID } from 'shared/model'
import { spacings } from 'styles'

import { MessageForm } from './form'
import { useMessageStore } from './store'
import { RenderMessages } from './renderMessages'

export function Home(_props: MatchProps) {
  const { state, revealMessage, removeMessage } = useMessageStore()
  const [showModal, setShowModal] = React.useState(false)
  const [maybeSelectedMessage, setSelectedMessage] = React.useState<
    Option<MessageWithID>
  >(none)

  function handleMessageClick(message: MessageWithID) {
    if (message.label === 'private' && !message.contentHasBeenRevealed) {
      setShowModal(true)
      setSelectedMessage(some(message))
    }
  }

  function handleRemove(message: MessageWithID) {
    removeMessage(message)
  }

  function handleProceed() {
    pipe(
      maybeSelectedMessage,
      mapOpt(m => {
        revealMessage(m)
        setShowModal(false)
      })
    )
  }

  const memoizedMessageClick = useMemoizedCallback(
    (message: MessageWithID) => handleMessageClick(message),
    [state.maybeMessages]
  )

  const messages = pipe(
    state.maybeMessages,
    mapOpt(mess => (
      <RenderMessages
        onRemove={handleRemove}
        onClick={memoizedMessageClick}
        messages={mess}
      />
    )),
    toUndefined
  )

  return (
    <>
      <div className={css({ marginBottom: spacings.xxl })}>
        <Loader size="medium">{messages}</Loader>
      </div>
      <MessageForm />
      <Modal
        showModal={showModal}
        onProceed={handleProceed}
        onClose={() => setShowModal(false)}
      >
        Reveal this message content?
      </Modal>
    </>
  )
}
