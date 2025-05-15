export class Board {
    rows: number = 100
    cols: number = 100
    cellSize: number = 10
    ctx: CanvasRenderingContext2D
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.rect(0, 0, this.rows * this.cellSize, this.cols * this.cellSize)
        this.ctx.stroke()
    } 
}