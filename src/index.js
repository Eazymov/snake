/* @flow strict */
import 'normalize.css'

import styles from './styles.module.scss'

import * as React from 'react'
import ReactDOM from 'react-dom'

import { SnakeGame } from './components'

type Props = {||}

// eslint-disable-next-line no-unused-vars
function App(props: Props) {
  return (
    <div className={styles.App}>
      <SnakeGame />
    </div>
  )
}

const $root = document.getElementById('root')

if ($root) {
  ReactDOM.render(<App />, $root)
}
