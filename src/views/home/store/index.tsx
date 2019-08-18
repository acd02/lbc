import { Either } from 'fp-ts/lib/Either'
import { none, Option } from 'fp-ts/lib/Option'
import * as React from 'react'

import { MessageWithID } from '/shared/model'

import { actions } from './actions'
import { reducer } from './reducer'

export type State = {
  maybeMessages: Option<MessageWithID[]>
  isFetching: boolean
}

type Provider = {
  state: State
  fetchMessages(): void
  addMessage(newMessage: MessageWithID): Either<void, void>
  removeMessage(message: MessageWithID): void
  revealMessage(message: MessageWithID): void
}

export type Action =
  | { type: 'SET_DATA'; payload: Option<MessageWithID[]> }
  | { type: 'FETCH_MESSAGES' }
  | { type: 'ADD_MESSAGE'; payload: Option<MessageWithID[]> }
  | { type: 'REMOVE_MESSAGE'; payload: Option<MessageWithID[]> }
  | { type: 'REVEAL_MESSAGE'; payload: Option<MessageWithID[]> }

export function MessagesProvider(props: React.Props<{}>) {
  const initialState: State = {
    maybeMessages: none,
    isFetching: false
  }

  // to prevent it from being called twice everytime, see: https://bit.ly/2H64VgM
  const memoizedReducer = React.useMemo(() => reducer, [])
  const [state, dispatch] = React.useReducer(memoizedReducer, initialState)

  return (
    <Provider
      value={{
        state,
        fetchMessages: () => actions.fetchMessages(dispatch, state),
        addMessage: (newMessage: MessageWithID) =>
          actions.addMessage(newMessage, dispatch, state),
        removeMessage: (message: MessageWithID) =>
          actions.removeMessage(message, dispatch, state),
        revealMessage: (message: MessageWithID) =>
          actions.revealMessage(message, dispatch, state)
      }}
    >
      {props.children}
    </Provider>
  )
}

export function useMessageStore(): Provider {
  const {
    state,
    fetchMessages,
    addMessage,
    removeMessage,
    revealMessage
  } = React.useContext(messageContext)

  return {
    state,
    fetchMessages,
    revealMessage,
    removeMessage,
    addMessage
  }
}

const messageContext = React.createContext<Provider>({} as Provider)
const { Provider } = messageContext
