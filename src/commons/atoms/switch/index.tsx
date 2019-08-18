import * as React from 'react'

import { useIsInitialMount } from '/utils/hooks'
import { doWhen } from '/utils/logic'

import { styles } from './styles'

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
    doWhen(!isInitialMount && !!props.shouldReset, () => setChecked(false))
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
