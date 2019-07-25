import * as React from 'react'
import { Option, none } from 'fp-ts/lib/Option'

import { Lens } from 'monocle-ts'

import { MessageWithID } from 'shared/model'

import { actions } from './actions'

export type State = {
  maybeMessages: Option<MessageWithID[]>
  isFetching: boolean
}

type Provider = {
  state: State
  fetchMessages(): void
  addMessage(newMessage: MessageWithID): void
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

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_DATA':
        return Lens.fromProps<State>()(['maybeMessages', 'isFetching']).set({
          maybeMessages: action.payload,
          isFetching: false
        })(state)
      case 'FETCH_MESSAGES':
        return Lens.fromProps<State>()(['maybeMessages', 'isFetching']).set({
          isFetching: true,
          maybeMessages: none
        })(state)
      case 'ADD_MESSAGE':
        return Lens.fromProps<State>()(['maybeMessages']).set({
          maybeMessages: action.payload
        })(state)
      case 'REMOVE_MESSAGE':
        return Lens.fromProps<State>()(['maybeMessages']).set({
          maybeMessages: action.payload
        })(state)
      case 'REVEAL_MESSAGE':
        return Lens.fromProps<State>()(['maybeMessages']).set({
          maybeMessages: action.payload
        })(state)
      default:
        return state
    }
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
