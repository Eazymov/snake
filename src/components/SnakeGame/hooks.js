/* @flow strict */
import * as React from 'react'

import { actions } from './reducer'
import { requireRef } from './utils'
import type { Settings } from './SettingsInput'
import { SnakeController } from './SnakeController'

type Dispatch<A> = A => void
type Ref<T> = {| current: T |}
type GameRef = Ref<null | SnakeController>

export function useGame(
  canvasRef: Ref<null | HTMLCanvasElement>,
  settings: Settings,
  dispatch: Dispatch<actions.Action>,
) {
  const gameRef: GameRef = React.useRef(null)

  React.useLayoutEffect(() => {
    function handleEnd() {
      dispatch(actions.gameOver())
    }

    function increaseScore() {
      dispatch(actions.addScore())
    }

    const $canvas = requireRef(canvasRef)
    const game = new SnakeController($canvas, {
      size: 20,
      cellSize: 20,
      onEnd: handleEnd,
      speed: settings.speed,
      onScore: increaseScore,
      bordered: settings.bordered,
      foodCount: settings.foodCount,
    })

    gameRef.current = game

    return () => {
      game.stop()
      game.destroy()
      handleEnd()
    }
  }, [settings, dispatch, canvasRef])

  return gameRef
}

export function useStartHandler(
  gameRef: GameRef,
  dispatch: Dispatch<actions.Action>,
) {
  return React.useCallback(() => {
    const game = requireRef(gameRef)

    game.start()
    dispatch(actions.startGame())
  }, [gameRef, dispatch])
}
