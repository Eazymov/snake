/* @flow strict */
import styles from './styles.module.scss'

import cn from 'classnames'
import * as React from 'react'

type Props =
  | {|
      value: string,
      disabled?: empty,
      onChange?: (value: string) => mixed,
    |}
  | {|
      value: string,
      disabled: true,
      onChange?: empty,
    |}

export function Input(props: Props) {
  const { disabled, onChange } = props
  const handleChange = React.useCallback(
    (event: SyntheticMouseEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (onChange) {
        onChange(value)
      }
    },
    [onChange],
  )

  return (
    <input
      type="text"
      disabled={disabled}
      value={props.value}
      onChange={handleChange}
      className={cn(styles.Input, { [styles.isDisabled]: disabled })}
    />
  )
}
