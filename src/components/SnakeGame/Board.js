/* @flow strict */
import { isDef } from 'checked'

type Config = {|
  size: number,
  cellSize: number,
|}

export type Cell = {|
  x: number,
  y: number,
|}

type CellConfig = {|
  x: number,
  y: number,
  lineWidth?: number,
  borderColor?: string,
  backgroundColor: string,
|}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export class Board {
  size: number
  pxSize: number
  cellSize: number
  $canvas: HTMLCanvasElement

  constructor($canvas: HTMLCanvasElement, config: Config) {
    const { size, cellSize } = config
    const pxSize = size * cellSize

    $canvas.width = pxSize
    $canvas.height = pxSize

    this.size = size
    this.cellSize = cellSize
    this.pxSize = pxSize
    this.$canvas = $canvas

    this.reset()
  }

  reset() {
    const { pxSize, $canvas } = this
    const context = $canvas.getContext('2d')

    context.fillStyle = '#333'
    context.fillRect(0, 0, pxSize, pxSize)
  }

  isOut(x: number, y: number) {
    const max = this.size - 1
    const min = 0

    return x > max || y > max || x < min || y < min
  }

  drawCell(config: CellConfig) {
    const {
      x,
      y,
      lineWidth,
      backgroundColor,
      borderColor = backgroundColor,
    } = config
    const { $canvas, cellSize } = this
    const context = $canvas.getContext('2d')

    context.fillStyle = backgroundColor
    context.strokeStyle = borderColor

    if (isDef(lineWidth)) {
      context.lineWidth = lineWidth
    }

    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }

  randomCell(): Cell {
    const { size } = this
    const x = getRandomInt(size)
    const y = getRandomInt(size)

    return {
      x,
      y,
    }
  }
}
