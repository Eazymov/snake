/* @flow strict */
import styles from './styles.module.scss'

import cn from 'classnames'
import * as React from 'react'

type Props = {|
  value: boolean,
  onChange: (value: boolean) => mixed,
|}

export function Toggle(props: Props) {
  const { value, onChange } = props
  const valueRef = React.useRef(value)
  const handleChange = React.useCallback(() => onChange(!valueRef.current), [
    onChange,
  ])

  valueRef.current = value

  return (
    <div
      tabIndex="0"
      role="button"
      onClick={handleChange}
      className={cn(styles.Toggle, { [styles.isChecked]: value })}
    />
  )
}
