import {
  getOrElse,
  filter as filterOpt,
  map as mapOpt,
  fold as foldOpt,
  some,
  option
} from 'fp-ts/lib/Option'
import { right, left } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { constVoid } from 'fp-ts/lib/function'
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

import { Action, State } from './index'

const optionSequence = sequenceT(option)
const messageLens = Lens.fromProp<MessageWithID>()('message')
const reveleadValueLens = Lens.fromNullableProp<MessageWithID>()(
  'contentHasBeenRevealed',
  undefined
)
const LOCAL_STORED_KEY = 'messages'

function fetchMessages(dispatch: React.Dispatch<Action>, state: State) {
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

function addMessage(
  newMessage: MessageWithID,
  dispatch: React.Dispatch<Action>,
  state: State
) {
  return pipe(
    optionSequence(state.maybeMessages, getItem(LOCAL_STORED_KEY)()),
    foldOpt(
      () => left(constVoid()),
      ([stateMessages, localStoredMessages]) => {
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

        return right(constVoid())
      }
    )
  )
}

function revealMessage(
  message: MessageWithID,
  dispatch: React.Dispatch<Action>,
  state: State
) {
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

function removeMessage(
  message: MessageWithID,
  dispatch: React.Dispatch<Action>,
  state: State
) {
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

export const actions = {
  fetchMessages,
  addMessage,
  revealMessage,
  removeMessage
}
