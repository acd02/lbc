import { Context, ALBEvent } from 'aws-lambda'
import { fromNullable, getOrElse, map as mapOpt } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

type Response = {
  statusCode: number
  body: {}
}

export async function handler(req: Omit<ALBEvent, 'requestContext'>, _context: Context) {
  const response: Response = {
    statusCode: 201,
    body: pipe(
      fromNullable(req.body),
      mapOpt(body => {
        const messageWithID = {
          ...JSON.parse(body),
          id: new Date().getTime(),
          timestamp: new Date().getTime()
        }

        return JSON.stringify(messageWithID)
      }),
      getOrElse(() => ({}))
    )
  }

  return response
}
