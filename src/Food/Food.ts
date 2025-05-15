import { Cell } from '~/Cell/Cell';

export class Food extends Cell {
    constructor(x: number, y: number, size: number, i: number, j: number) {
        super(x, y, size, i, j);
        this.agent = 'food';
        this._color = 'yellow';
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        
        // Дополнительная отрисовка для еды
        const centerX = this.x * this._cellSize + this._cellSize / 2;
        const centerY = this.y * this._cellSize + this._cellSize / 2;
        const radius = this._cellSize / 6;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.strokeStyle = 'brown';
        ctx.stroke();
    }
}
