import { Cell } from '~/Cell/Cell';
import { Position } from '~/types';
import { AntWorker } from '~/AntWorker/AntWorker';

export class Queen extends Cell {
    private _foodCount: number = 0;
    private _maxFoodCount: number = 10;

    constructor(x: number, y: number, size: number, i: number, j: number, maxStepsWithoutFood: number) {
        super(x, y, size, i, j);
        this.agent = 'queen';
        this._color = 'purple';
        this._foodCount = maxStepsWithoutFood;
    }

    public tick(): void {   
        // super.tick();
        if (!this.isAlive()) return;
    }

    public createAnt(hasNearbyFood: boolean, createAntWithFoodProb: number, createAntWithoutFoodProb: number, maxStepsWithoutFood: number): AntWorker | null {
        // Если есть еда рядом, создаём муравья с вероятностью P1
        if (hasNearbyFood && Math.random() < createAntWithFoodProb) {
            return new AntWorker(this._x, this._y, this.size, maxStepsWithoutFood);
        }

        // Если нет еды рядом, создаём муравья с вероятностью P2
        if (!hasNearbyFood && Math.random() < createAntWithoutFoodProb) {
            return new AntWorker(this._x, this._y, this.size, maxStepsWithoutFood);
        }

        return null;
    }

    public isAlive(): boolean {
        return this._foodCount < this._maxFoodCount;
    }

    public drawQueen(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        
        // Дополнительная отрисовка для матки
        const centerX = this._x + this.size / 2;
        const centerY = this._y + this.size / 2;
        const radius = this.size / 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.strokeStyle = 'darkpurple';
        ctx.stroke();

        // Отображение состояния голода
        const hungerPercentage = this._foodCount / this._maxFoodCount;
        const hungerBarHeight = 4;
        const hungerBarWidth = this.size * 0.8;
        const hungerBarX = this._x + this.size * 0.1;
        const hungerBarY = this._y + this.size - hungerBarHeight - 2;

        // Фон индикатора голода
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth, hungerBarHeight);

        // Заполнение индикатора голода
        ctx.fillStyle = `rgba(255, 0, 0, ${hungerPercentage})`;
        ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth * hungerPercentage, hungerBarHeight);
    }
}
