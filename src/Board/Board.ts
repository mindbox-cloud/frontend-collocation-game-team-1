import {Cell} from '~/Cell/Cell'
import { Good } from '~/Good/Good'



interface BoardParams {
  canvas: HTMLCanvasElement
  queensCount: number
  createAntWithFoodProbability: number
  createAntWithoutFoodProbability: number
  goodsCount: number
  queenDeathSteps: number
  antDeathSteps: number
}
export class Board {
  _canvas: HTMLCanvasElement
  _board: Cell[][] = []
  _rows: number = 100
  _cols: number = 100
  _cellSize: number = 50
  _ctx: CanvasRenderingContext2D
  private queensCount: number
  private createAntWithFoodProbability: number
  private createAntWithoutFoodProbability: number
  private goodsCount: number
  private queenDeathSteps: number
  private antDeathSteps: number
  private goods: Good[] = []

  constructor(params: BoardParams) {
    this.queensCount = params.queensCount
    this.createAntWithFoodProbability = params.createAntWithFoodProbability
    this.createAntWithoutFoodProbability = params.createAntWithoutFoodProbability
    this.goodsCount = params.goodsCount    
    this.queenDeathSteps = params.queenDeathSteps
    this.antDeathSteps = params.antDeathSteps
    this._canvas = params.canvas
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
  }

  init({size}: {size: {n: number; m: number}}) {
    this._updateBoardSize(size)
    this._canvas.width = this._rows * this._cellSize
    this._canvas.height = this._cols * this._cellSize
    this._fillBoard()
    this._drawBoard()
  }

  get board(): Cell[][] {
    return this._board
  }

  private updateGoods() {
    if (!this.goods.length) {
        for (let i = 0; i < this.goodsCount; i++) {

            this.goods.push(new Good(Math.random() * this._rows * this._cellSize, Math.random() * this._cols * this._cellSize, this._cellSize))
        }
    }
  }

  _updateBoardSize(size: { n: number, m: number }) {
    this._rows = size.n
    this._cols = size.m
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
    this.updateGoods()
    console.log(this.goods)

    this._ctx.beginPath()
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        this._board[i][j].draw(this._ctx)
      }
    }

    for (let i = 0; i < this.goods.length; i++) {
      this.goods[i].draw(this._ctx)
    }
  }
}
