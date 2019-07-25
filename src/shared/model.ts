export type Err = {
  message: string
  code: number
}

export type Message = {
  message: string
  label: 'public' | 'private'
}

export type MessageWithID = Message & {
  id: number
  timestamp: number
  contentHasBeenRevealed?: boolean
}
