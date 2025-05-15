import { Cell } from "~/Cell/Cell";

export class Good extends Cell {
    constructor(x: number, y: number, size: number) {
        super(x, y, size)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.x + this.size/4, this.y + this.size/4, this.size/4, 0, Math.PI * 2);
        ctx.fill();
    }
}