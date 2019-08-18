import { none } from 'fp-ts/lib/Option'
import { Lens } from 'monocle-ts'

import { Action, State } from './index'

export function reducer(state: State, action: Action): State {
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
