import { css } from 'emotion'
import { isNone, map as mapOpt, none, Option, some, toUndefined } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'

import { Loader } from '/commons/atoms/loader'
import { Modal } from '/commons/atoms/modal'
import { MatchProps } from '/routes'
import { MessageWithID } from '/shared/model'
import { spacings } from '/styles'
import { useMemoizedCallback } from '/utils/hooks'

import { MessageForm } from './form'
import { RenderMessages } from './renderMessages'
import { useMessageStore } from './store'

export function Home(_props: MatchProps) {
  const { state, revealMessage, removeMessage, fetchMessages } = useMessageStore()
  const [showModal, setShowModal] = React.useState(false)
  const [maybeSelectedMessage, setSelectedMessage] = React.useState<
    Option<MessageWithID>
  >(none)

  React.useEffect(() => {
    isNone(state.maybeMessages) && fetchMessages()
  }, [])

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
