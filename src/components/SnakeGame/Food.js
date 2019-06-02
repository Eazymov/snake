/* @flow strict */
import { Snake } from './Snake'
import { type Cell, Board } from './Board'

type Config = {|
  board: Board,
  snake: Snake,
  count: number,
|}

export class Food {
  snake: Snake
  board: Board
  count: number
  items: Cell[] = []

  constructor(config: Config) {
    const { count, board, snake } = config

    this.snake = snake
    this.board = board
    this.count = count

    this.fillItems()
  }

  fillItems() {
    for (let idx = 0; idx < this.count; idx += 1) {
      this.add()
    }
  }

  add() {
    this.items.push(this.create())
  }

  reset() {
    this.items = []
    this.fillItems()
  }

  create() {
    const cell = this.board.randomCell()
    const isExist = this.items.some(
      item => item.x === cell.x && item.y === cell.y,
    )

    if (isExist) {
      return this.create()
    }

    if (this.snake.has(cell)) {
      return this.create()
    }

    return cell
  }

  draw() {
    const { items, snake, board } = this

    items.slice().forEach((cell, idx) => {
      if (snake.matchHead(cell)) {
        snake.feed()
        items.splice(idx, 1, this.create())
      }
    })

    items.forEach(cell => {
      board.drawCell({
        x: cell.x,
        y: cell.y,
        lineWidth: 2,
        backgroundColor: 'red',
        borderColor: 'white',
      })
    })
  }
}
