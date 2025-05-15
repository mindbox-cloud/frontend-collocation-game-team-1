type CellColor = 'red' | 'green' | 'blue' | 'yellow' | 'none';

class CellAgent {
    private _cell: Cell;

    constructor(cell: Cell) {
        this._cell = cell;
    }

    public get cell(): Cell {
        return this._cell;
    }

    public set cell(cell: Cell) {
        this._cell = cell;
    }
}

export class Cell {
    private _color: CellColor;
    private _agent: CellAgent | null;

    constructor(color: CellColor = 'none', agent: CellAgent | null = null) {
        this._color = color;
        this._agent = agent;
    }

    public get color(): CellColor {
        return this._color;
    }

    public set color(color: CellColor) {
        this._color = color;
    }

    public get agent(): CellAgent | null {
        return this._agent;
    }

    public set agent(agent: CellAgent | null) {
        this._agent = agent;
    }
}