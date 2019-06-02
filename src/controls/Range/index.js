/* @flow strict */
import * as React from 'react'

type Props = {|
  min?: number,
  max?: number,
  value: number,
  step?: number,
  onChange: (value: number) => mixed,
|}

export function Range(props: Props) {
  const { onChange } = props
  const handleChange = React.useCallback(
    (event: SyntheticMouseEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      onChange(parseInt(value, 10))
    },
    [onChange],
  )

  return (
    <input
      min="1"
      max="10"
      step="1"
      type="range"
      value={props.value}
      onChange={handleChange}
    />
  )
}
