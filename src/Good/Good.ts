import { Cell } from "~/Cell/Cell";

export class Good extends Cell {
    private _itemsCount: number = 1;

    constructor(x: number, y: number, size: number, i: number, j: number) {
        super(x, y, size, i, j);
        this.agent = 'good'
    }

    public get itemsCount(): number {
        return this._itemsCount;
    }

    public incrementItemsCount(): void {
        this._itemsCount++;
    }

    public decrementItemsCount(): void {
        this._itemsCount--;
    }

    public drawGood(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.x + this.size/4, this.y + this.size/4, this.size/4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = `${this.size/3}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this._itemsCount.toString(),
            this.x + this.size/4,
            this.y + this.size/4
        );
    }
}