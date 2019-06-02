/* @flow strict */

type StartGame = {|
  type: 'START_GAME',
|}

type AddScore = {|
  type: 'ADD_SCORE',
|}

type GameOver = {|
  type: 'GAME_OVER',
|}

export type Action = AddScore | GameOver | StartGame

export function startGame(): StartGame {
  return {
    type: 'START_GAME',
  }
}

export function addScore(): AddScore {
  return {
    type: 'ADD_SCORE',
  }
}

export function gameOver(): GameOver {
  return {
    type: 'GAME_OVER',
  }
}
