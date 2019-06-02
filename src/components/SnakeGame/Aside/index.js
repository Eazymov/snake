/* @flow strict */
import styles from './styles.module.scss'

import * as React from 'react'

type Props = {|
  children: React.Node,
|}

export function Aside(props: Props) {
  return <div className={styles.Aside}>{props.children}</div>
}
