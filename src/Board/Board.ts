import {Cell} from '~/Cell'

export class Board {
    _canvas: HTMLCanvasElement
  _board: Cell[][] = []
  _rows: number = 100
  _cols: number = 100
  _cellSize: number = 20
  _ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  init({ size }: { size: number }) {
    this._updateBoardSize(size)
    this._canvas.width = this._rows * this._cellSize
    this._canvas.height = this._cols * this._cellSize
    this._fillBoard()
    this._drawBoard()
  }

  get board(): Cell[][] {
    return this._board
  }

  _updateBoardSize(size: number) {
    this._rows = size
    this._cols = size
  }

  _fillBoard() {
    for (let i = 0; i < this._rows; i++) {
      this._board[i] = []
      for (let j = 0; j < this._cols; j++) {
        this._board[i][j] = new Cell(i * this._cellSize, j * this._cellSize, this._cellSize)
      }
    }
  }

  _drawBoard() {
    this._ctx.beginPath()
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        this._board[i][j].draw(this._ctx)
      }
    }
  }
}
