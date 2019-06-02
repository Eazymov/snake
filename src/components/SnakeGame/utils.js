/* @flow strict */
import invariant from 'invariant'
import { isNotMaybe } from 'checked'

export function requireRef<T>(ref: {| current: T |}): $NonMaybeType<T> {
  const { current } = ref

  invariant(isNotMaybe(current), 'Unexpected null')

  return current
}
