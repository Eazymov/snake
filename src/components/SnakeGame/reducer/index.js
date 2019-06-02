/* @flow strict */
import * as actions from './actions'
import { actionTypes } from './actionTypes'

type State = $ReadOnly<{|
  score: number,
  isOver: boolean,
  showStartup: boolean,
|}>

export const initialState: State = {
  score: 0,
  isOver: false,
  showStartup: true,
}

export { actions }

export function reducer(state: State, action: actions.Action) {
  switch (action.type) {
    case actionTypes.START_GAME:
      return {
        score: 0,
        isOver: false,
        showStartup: false,
      }

    case actionTypes.ADD_SCORE:
      return {
        ...state,
        score: state.score + 1,
      }

    case actionTypes.GAME_OVER:
      return {
        ...state,
        score: 0,
        isOver: true,
        showStartup: false,
      }

    default:
      return state
  }
}
