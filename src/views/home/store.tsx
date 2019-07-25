/* eslint-disable max-lines */
import * as React from 'react'
import {
  Option,
  none,
  getOrElse,
  filter as filterOpt,
  map as mapOpt,
  some,
  option
} from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {
  snoc,
  findFirst,
  findIndex,
  unsafeUpdateAt,
  unsafeDeleteAt
} from 'fp-ts/lib/Array'
import { sequenceT } from 'fp-ts/lib/Apply'
import { setItem, getItem } from 'fp-ts-local-storage'
import { Lens } from 'monocle-ts'

import { MessageWithID } from 'shared/model'

const optionSequence = sequenceT(option)
const messageLens = Lens.fromProp<MessageWithID>()('message')
const reveleadValueLens = Lens.fromNullableProp<MessageWithID>()(
  'contentHasBeenRevealed',
  undefined
)
const LOCAL_STORED_KEY = 'messages'

type State = {
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

type Action =
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

  function fetchMessages() {
    pipe(
      getItem(LOCAL_STORED_KEY)(),
      filterOpt(() => !state.isFetching),
      mapOpt(localStoredMessages => {
        dispatch({ type: 'FETCH_MESSAGES' })

        const parsedLocalStoredMessages: MessageWithID[] = JSON.parse(localStoredMessages)
        const updatedMessages = parsedLocalStoredMessages.map(message =>
          message.label === 'public' ? message : messageLens.set('')(message)
        )

        // simulating slow network request
        setTimeout(() => {
          dispatch({ type: 'SET_DATA', payload: some(updatedMessages) })
        }, 2000)
      }),
      getOrElse(() => {
        dispatch({ type: 'SET_DATA', payload: some([]) })
        setItem(LOCAL_STORED_KEY, '[]')()
      })
    )
  }

  function addMessage(newMessage: MessageWithID) {
    pipe(
      optionSequence(state.maybeMessages, getItem(LOCAL_STORED_KEY)()),
      mapOpt(([stateMessages, localStoredMessages]) => {
        const parsedLocalStoredMessages: MessageWithID[] = JSON.parse(localStoredMessages)
        const updatedMessage =
          newMessage.label === 'public' ? newMessage : messageLens.set('')(newMessage)

        dispatch({
          type: 'ADD_MESSAGE',
          payload: some(snoc(stateMessages, updatedMessage))
        })
        setItem(
          LOCAL_STORED_KEY,
          JSON.stringify(snoc(parsedLocalStoredMessages, newMessage))
        )()
      })
    )
  }

  function revealMessage(message: MessageWithID) {
    pipe(
      optionSequence(state.maybeMessages, getItem(LOCAL_STORED_KEY)()),
      mapOpt(([stateMessages, localStoredMessages]) => {
        const parsedLocalStoredMessages: MessageWithID[] = JSON.parse(localStoredMessages)

        pipe(
          optionSequence(
            findFirst<MessageWithID>(m => m.id === message.id)(parsedLocalStoredMessages),
            findIndex<MessageWithID>(m => m.id === message.id)(stateMessages)
          ),
          mapOpt(([m, index]) => {
            const updatedMessage = reveleadValueLens.set(true)(m)
            dispatch({
              type: 'REVEAL_MESSAGE',
              payload: some(unsafeUpdateAt(index, updatedMessage, stateMessages))
            })
          })
        )
      })
    )
  }

  function removeMessage(message: MessageWithID) {
    pipe(
      optionSequence(state.maybeMessages, getItem(LOCAL_STORED_KEY)()),
      mapOpt(([stateMessages, localStoredMessages]) => {
        const parsedLocalStoredMessages: MessageWithID[] = JSON.parse(localStoredMessages)

        pipe(
          optionSequence(
            findIndex<MessageWithID>(m => m.id === message.id)(parsedLocalStoredMessages),
            findIndex<MessageWithID>(m => m.id === message.id)(stateMessages)
          ),
          mapOpt(([localStoredIndex, stateIndex]) => {
            dispatch({
              type: 'REMOVE_MESSAGE',
              payload: some(unsafeDeleteAt(stateIndex, stateMessages))
            })

            setItem(
              LOCAL_STORED_KEY,
              JSON.stringify(unsafeDeleteAt(localStoredIndex, parsedLocalStoredMessages))
            )()
          })
        )
      })
    )
  }

  return (
    <Provider
      value={{
        state,
        fetchMessages,
        addMessage,
        removeMessage,
        revealMessage
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
