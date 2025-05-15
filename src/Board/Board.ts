import { Cell } from "~/Cell"

export class Board {
    _board: Cell[][] = []
    _rows: number = 100
    _cols: number = 100
    ctx: CanvasRenderingContext2D
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    init({ size }: { size: number }) {
        this.fillBoard()
        this.drawBoard()
    }
    
    get board(): Cell[][] {
        return this._board
    }

    updateBoardSize(size: number) {
        console.log('updateBoardSize called!', size)
    }

    fillBoard() {
        const size = 40
        for (let i = 0; i < this._rows; i++) {
            this._board[i ] = []
            for (let j = 0; j < this._cols; j++) {
                this._board[i][j] = new Cell(i * size, j * size, size)
            }
        }
    }

    drawBoard() {
        this.ctx.beginPath()
        for (let i = 0; i < this._board.length; i++) {
            for(let j = 0; j < this._board[i].length; j++) {
                this._board[i][j].draw(this.ctx)
            }
        }
    } 
}