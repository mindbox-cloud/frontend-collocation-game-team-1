type CellColor = 'red' | 'green' | 'blue' | 'yellow' | 'white';

export class Cell {
    private _color: CellColor = 'white';
    private _x: number;
    private _y: number;
    private _size: number;

    constructor( x: number, y: number, size: number = 20) {
        this._x = x;
        this._y = y;
        this._size = size;
    }

    public get color(): CellColor {
        return this._color;
    }

    public set color(color: CellColor) {
        this._color = color;
    }

    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        this._y = y;
    }

    public get size(): number {
        return this._size;
    }

    public set size(size: number) {
        this._size = size;
    }
    
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._size, this._size);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.strokeRect(this._x, this._y, this._size, this._size);

        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillText(`${this._x},${this._y}`, this._x + 2, this._y + 16);
    }
}