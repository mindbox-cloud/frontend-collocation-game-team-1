import { Cell } from '~/Cell/Cell';
import { Position } from '~/types';

export class FoodStorage extends Cell {
    constructor(x: number, y: number, size: number, i: number, j: number) {
        super(x, y, size, i, j);
        this.agent = 'foodStorage';
        this._color = 'green';
    }

    public tick(): void {
        // Генерация еды каждый ход
        // TODO: Добавить логику создания еды в соседней клетке
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        
        // Дополнительная отрисовка для едохранилища
        const centerX = this._x * this._size + this._size / 2;
        const centerY = this._y * this._size + this._size / 2;
        const radius = this._size / 4;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'darkgreen';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}
