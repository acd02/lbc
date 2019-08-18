import { fromNullable, getOrElse, map as mapOpt } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'

type Props = {
  onExternalClick: () => void
  className?: string
}
export function ExternalClick(props: Props & React.Props<{}>) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    document.addEventListener('click', handleExternalClicks, true)

    return () => document.removeEventListener('click', handleExternalClicks, true)
  }, [])

  function handleExternalClicks(e: MouseEvent) {
    const target = e.target as HTMLElement

    const hasClickedOutside = pipe(
      fromNullable(rootRef.current),
      mapOpt(_ => !_.contains(target)),
      getOrElse(() => false)
    )

    if (hasClickedOutside) props.onExternalClick()
  }

  return (
    <div className={props.className} ref={rootRef}>
      {props.children}
    </div>
  )
}
