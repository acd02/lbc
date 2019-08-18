/**
 * Only execute the `fun` function if the predicate is true
 *
 */
export function doWhen(predicate: boolean, fun: () => void) {
  if (predicate) fun()
}
