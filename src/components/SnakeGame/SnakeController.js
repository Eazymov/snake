/* @flow strict */
import { Food } from './Food'
import { Snake } from './Snake'
import { Board } from './Board'

type Config = {|
  size: number,
  speed: number,
  cellSize: number,
  bordered: boolean,
  foodCount: number,
  onEnd: () => mixed,
  onScore: () => mixed,
|}

export class SnakeController {
  food: Food
  snake: Snake
  board: Board
  config: Config
  isPaused: boolean = false
  $canvas: HTMLCanvasElement
  timeoutId: null | TimeoutID = null

  constructor($canvas: HTMLCanvasElement, config: Config) {
    const board = new Board($canvas, {
      size: config.size,
      cellSize: config.cellSize,
    })
    const snake = new Snake(board, {
      onFeed: config.onScore,
      bordered: config.bordered,
      onDeadlock: this.handleEnd,
    })
    const food = new Food({
      board,
      snake,
      count: config.foodCount,
    })

    this.food = food
    this.board = board
    this.snake = snake
    this.config = config
    this.$canvas = $canvas

    this.draw()
    this.bindEventListeners()
  }

  handleEnd = () => {
    this.clearTimeout()
    this.config.onEnd()
  }

  handleKeydown = (event: KeyboardEvent) => {
    const { snake } = this

    switch (event.keyCode) {
      case 38:
        snake.setDirection(Snake.DIRECTIONS.UP)

        break

      case 39:
        snake.setDirection(Snake.DIRECTIONS.RIGHT)

        break

      case 40:
        snake.setDirection(Snake.DIRECTIONS.DOWN)

        break

      case 37:
        snake.setDirection(Snake.DIRECTIONS.LEFT)

        break

      default:
        break
    }
  }

  clearTimeout() {
    clearTimeout(this.timeoutId)
  }

  reset() {
    this.clearTimeout()
    this.snake.reset()
    this.food.reset()
    this.draw()
  }

  pause() {
    this.isPaused = true
    this.clearTimeout()
  }

  resume() {
    if (this.isPaused) {
      this.frame()
    }
  }

  start() {
    this.reset()
    this.$canvas.focus()
    this.frame()
  }

  stop() {
    this.reset()
  }

  draw() {
    const { food, snake, board } = this

    board.reset()
    snake.draw()
    food.draw()
  }

  frame = () => {
    const { speed } = this.config

    this.clearTimeout()
    this.timeoutId = setTimeout(this.frame, 500 / speed)
    this.snake.move()
    this.draw()
  }

  handleFocus = () => {
    this.resume()
  }

  handleBlur = () => {
    this.pause()
  }

  bindEventListeners() {
    const { $canvas } = this

    $canvas.addEventListener('blur', this.handleBlur)
    $canvas.addEventListener('focus', this.handleFocus)
    $canvas.addEventListener('keydown', this.handleKeydown)
  }

  unbindEventListeners() {
    const { $canvas } = this

    $canvas.removeEventListener('blur', this.handleBlur)
    $canvas.removeEventListener('focus', this.handleFocus)
    $canvas.removeEventListener('keydown', this.handleKeydown)
  }

  destroy() {
    this.stop()
    this.unbindEventListeners()
  }
}
