/* @flow strict */
import styles from './styles.module.scss'

import * as React from 'react'

type Props = {|
  isOver: boolean,
  showStartup: boolean,
  onClick: () => mixed,
|}

export function Layer(props: Props) {
  const { isOver, showStartup } = props

  if (!(isOver || showStartup)) {
    return null
  }

  return (
    <div tabIndex="0" onClick={props.onClick} className={styles.Layer}>
      {isOver && (
        <>
          Game is over.
          <br />
          Click to restart
        </>
      )}
      {showStartup && 'Click to start'}
    </div>
  )
}
