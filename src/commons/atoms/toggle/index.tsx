import { cx } from 'emotion'
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

export function Toggle(props: Props) {
  const { shouldReset, onChecked, onUnchecked, id, className } = props
  const [isChecked, setChecked] = React.useState<boolean>(props.checkedOnMount || false)
  const isInitialMount = useIsInitialMount()

  React.useEffect(() => {
    doWhen(!isInitialMount && !!shouldReset, () => setChecked(false))
  }, [shouldReset])

  function updateState() {
    setChecked(!isChecked)

    if (onChecked && !isChecked) onChecked()
    if (onUnchecked && isChecked) onUnchecked()
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.which === 13) updateState()
  }

  return (
    <div className={cx(styles.root, className)} tabIndex={0} onKeyPress={handleKeyPress}>
      <input onClick={updateState} type="checkbox" id={id} className={styles.input} />
      <label htmlFor={id} className={styles.setLabel({ isChecked })} />
    </div>
  )
}
