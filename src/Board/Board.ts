import {Cell} from '~/Cell'

export class Board {
  _board: Cell[][] = []
  _rows: number = 100
  _cols: number = 100
  _cellSize: number = 20
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  init() {
    this._fillBoard()
    this._drawBoard()
  }

  get board(): Cell[][] {
    return this._board
  }

  _updateBoardSize(size: number) {
    this._rows = size
    this._cols = size
    this.init()
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
    this.ctx.beginPath()
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        this._board[i][j].draw(this.ctx)
      }
    }
  }
}
