/* @flow strict */
import styles from './styles.module.scss'

import * as React from 'react'

type Props = {|
  title: string,
  children: React.Node,
|}

export function Label(props: Props) {
  return (
    <label className={styles.Label}>
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </label>
  )
}
