/* @flow strict */
import styles from './styles.module.scss'

import * as React from 'react'

import { Aside } from './Aside'
import { Layer } from './Layer'
import { SettingsInput } from './SettingsInput'
import { Flex, Label, Input } from '../../controls'
import { reducer, initialState } from './reducer'
import { useGame, useStartHandler } from './hooks'

type Props = {||}

// eslint-disable-next-line no-unused-vars
export function SnakeGame(props: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const canvasRef = React.useRef((null: HTMLCanvasElement | null))
  const [settings, setSettings] = SettingsInput.useSettings()
  const gameRef = useGame(canvasRef, settings, dispatch)
  const handleStart = useStartHandler(gameRef, dispatch)

  return (
    <section className={styles.SnakeGame}>
      <h1 className={styles.title}>Snake</h1>
      <Flex>
        <div className={styles.snakeBoard}>
          <canvas tabIndex="0" ref={canvasRef} className={styles.canvas} />
          <Layer
            isOver={state.isOver}
            onClick={handleStart}
            showStartup={state.showStartup}
          />
        </div>
        <Aside>
          <Label title="Score">
            <Input disabled value={state.score.toString()} />
          </Label>
          <br />
          <SettingsInput settings={settings} onChange={setSettings} />
        </Aside>
      </Flex>
    </section>
  )
}
