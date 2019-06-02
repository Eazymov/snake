/* @flow strict */
import { isDef } from 'checked'
import invariant from 'invariant'

import { type Cell, Board } from './Board'

const DIRECTIONS = {
  UP: {
    dx: 0,
    dy: -1,
  },
  RIGHT: {
    dx: 1,
    dy: 0,
  },
  DOWN: {
    dx: 0,
    dy: 1,
  },
  LEFT: {
    dx: -1,
    dy: 0,
  },
}

const initialDirection = DIRECTIONS.RIGHT

type Direction = $Values<typeof DIRECTIONS>

type Config = {|
  bordered: boolean,
  onFeed: () => mixed,
  onDeadlock: () => mixed,
|}

function isReversedDirection(a: Direction, b: Direction) {
  return a.dx === -b.dx || a.dy === -b.dy
}

function createHead(board: Board): Cell {
  const mid = Math.floor(board.size / 2)

  return {
    x: 0,
    y: mid,
  }
}

export class Snake {
  static DIRECTIONS = DIRECTIONS

  board: Board
  parts: Cell[] = []
  bordered: boolean = false
  isChangingDirection: boolean = false
  direction: Direction = initialDirection
  onFeed: () => mixed
  onDeadlock: () => mixed

  constructor(board: Board, config: Config) {
    const { onFeed, bordered, onDeadlock } = config

    this.board = board
    this.onFeed = onFeed
    this.bordered = bordered
    this.onDeadlock = onDeadlock
    this.parts.push(createHead(board))
  }

  getLength() {
    return this.parts.length
  }

  getHead() {
    const [head] = this.parts

    invariant(isDef(head), 'unexpected undefined head')

    return head
  }

  getTail() {
    const { parts } = this
    const tail = parts[parts.length - 1]

    invariant(isDef(tail), 'unexpected undefined tail')

    return tail
  }

  setDirection(direction: Direction) {
    if (
      this.getLength() > 1 &&
      isReversedDirection(this.direction, direction)
    ) {
      return false
    }

    if (this.isChangingDirection) {
      return false
    }

    this.direction = direction
    this.isChangingDirection = true

    return true
  }

  reset() {
    this.direction = initialDirection
    this.isChangingDirection = false
    this.parts = [createHead(this.board)]
  }

  correctCell(cell: Cell) {
    let { x, y } = cell
    const max = this.board.size - 1
    const min = 0

    if (x > max) {
      x = min
    }

    if (y > max) {
      y = min
    }

    if (x < min) {
      x = max
    }

    if (y < min) {
      y = max
    }

    return {
      x,
      y,
    }
  }

  move() {
    const { board, parts, direction } = this
    const prevHead = this.getHead()

    const newX = prevHead.x + direction.dx
    const newY = prevHead.y + direction.dy
    let newHead = {
      x: newX,
      y: newY,
    }

    if (this.bordered && board.isOut(newHead)) {
      this.onDeadlock()

      return
    }

    newHead = this.correctCell(newHead)
    parts.pop()

    if (this.has(newHead)) {
      this.onDeadlock()

      return
    }

    parts.unshift(newHead)
    this.isChangingDirection = false
  }

  feed() {
    const { parts } = this

    parts.push({
      ...this.getTail(),
    })
    this.onFeed()
  }

  drawPart = (cell: Cell) => {
    const { board } = this

    board.drawCell(cell, {
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
    })
  }

  draw() {
    this.parts.forEach(this.drawPart)
  }

  matchHead(cell: Cell) {
    const head = this.getHead()

    return head.x === cell.x && head.y === cell.y
  }

  has(cell: Cell) {
    return this.parts.some(part => part.x === cell.x && part.y === cell.y)
  }
}
