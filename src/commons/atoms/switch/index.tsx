import { styles } from './styles'

import * as React from 'react'
import { fromPredicate, map as mapOpt } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { useIsInitialMount } from 'utils/hooks'

type Props = {
  id: string
  className?: string
  checkedOnMount?: boolean
  onChecked?: () => void
  onUnchecked?: () => void
  shouldReset?: boolean
}

export function Switch(props: Props) {
  const [isChecked, setChecked] = React.useState<boolean>(props.checkedOnMount || false)
  const isInitialMount = useIsInitialMount()

  React.useEffect(() => {
    pipe(
      fromPredicate<boolean>(_isInitialMount => _isInitialMount && !!props.shouldReset)(
        isInitialMount
      ),
      mapOpt(() => setChecked(false))
    )
  }, [props.shouldReset])

  function handleClick() {
    const { onChecked, onUnchecked } = props
    setChecked(!isChecked)

    if (onChecked && !isChecked) onChecked()
    if (onUnchecked && isChecked) onUnchecked()
  }

  const { id, className } = props

  return (
    <div className={className}>
      <input onClick={handleClick} type="checkbox" id={id} className={styles.root} />
      <label htmlFor={id} className={styles.setLabel({ isChecked })} />
    </div>
  )
}
