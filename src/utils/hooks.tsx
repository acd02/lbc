import * as React from 'react'

/**
 * @returns Returns a boolean to let you know
 * if your component is rendering for the first time
 *
 */
export function useIsInitialMount() {
  const isInitialMountRef = React.useRef(true)

  React.useLayoutEffect(() => {
    /* eslint-disable-next-line fp/no-mutation */
    if (isInitialMountRef.current) isInitialMountRef.current = false
  })

  return isInitialMountRef.current
}

/**
 * Useful when you when to pass a function that depends on a piece of state,
 * as a prop, without triggering a re-render everytime.
 *
 * @example
 *
 * function SomeComponent() {
 *  const bar = useMemoizedCallback((value: T) => {
 *    // do stuff, update state
 * }, [someState])
 *
 * <OtherComponent onChange={bar} />
 * }
 *
 */
export function useMemoizedCallback<T>(
  callback: (arg: T) => void,
  dependencyList: readonly unknown[]
) {
  // Instance to hold the actual callback.
  const callbackRef = React.useRef(callback)

  // The memoized callback that won't change and calls the changed callbackRef.
  const memoizedCallback = React.useCallback((arg: T) => {
    return callbackRef.current(arg)
  }, [])

  // The callback that is constantly updated according to the dependencies.
  const updatedCallback = React.useCallback(callback, dependencyList)

  // The effect updates the callbackRef depending on the dependencies.
  React.useEffect(() => {
    /* eslint-disable-next-line fp/no-mutation */
    callbackRef.current = updatedCallback
  }, dependencyList)

  // Return the memoized callback.
  return memoizedCallback
}
