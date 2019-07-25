import { Lens } from 'monocle-ts'

import { State } from './index'

type Action =
  | {
      type: 'SET_DEFAULT_HEIGHT'
      payload: number
    }
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'SET_IS_FOCUSED'; payload: boolean }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DEFAULT_HEIGHT':
      return Lens.fromProp<State>()('defaultHeight').set(action.payload)(state)
    case 'SET_VALUE':
      return Lens.fromProp<State>()('value').set(action.payload)(state)
    case 'SET_IS_FOCUSED':
      return Lens.fromProp<State>()('isFocused').set(action.payload)(state)
    default:
      return state
  }
}
