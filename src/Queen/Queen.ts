import { Cell } from '~/Cell/Cell';
import { Position } from '~/types';
import { AntWorker } from '~/AntWorker/AntWorker';

export class Queen extends Cell {
    private _foodCount: number = 0;
    private _maxFoodCount: number = 10;

    constructor(x: number, y: number, size: number, maxStepsWithoutFood: number) {
        super(x, y, size);
        this._type = 'queen';
        this._color = 'purple' as const;
        this._maxStepsWithoutFood = maxStepsWithoutFood;
    }

    public override tick(): void {
        super.tick();
        if (!this.isAlive()) return;
    }

    public createAnt(hasNearbyFood: boolean, createAntWithFoodProb: number, createAntWithoutFoodProb: number, maxStepsWithoutFood: number): AntWorker | null {
        // Если есть еда рядом, создаём муравья с вероятностью P1
        if (hasNearbyFood && Math.random() < createAntWithFoodProb) {
            return new AntWorker(this._position.x, this._position.y, this._cellSize, maxStepsWithoutFood);
        }

        // Если нет еды рядом, создаём муравья с вероятностью P2
        if (!hasNearbyFood && Math.random() < createAntWithoutFoodProb) {
            return new AntWorker(this._position.x, this._position.y, this._cellSize, maxStepsWithoutFood);
        }

        return null;
    }

    public isAlive(): boolean {
        return this._stepsWithoutFood < this._maxStepsWithoutFood;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        
        // Дополнительная отрисовка для матки
        const centerX = this._position.x * this._cellSize + this._cellSize / 2;
        const centerY = this._position.y * this._cellSize + this._cellSize / 2;
        const radius = this._cellSize / 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.strokeStyle = 'darkpurple';
        ctx.stroke();

        // Отображение состояния голода
        const hungerPercentage = this._stepsWithoutFood / this._maxStepsWithoutFood;
        const hungerBarHeight = 4;
        const hungerBarWidth = this._cellSize * 0.8;
        const hungerBarX = this._position.x * this._cellSize + this._cellSize * 0.1;
        const hungerBarY = this._position.y * this._cellSize + this._cellSize - hungerBarHeight - 2;

        // Фон индикатора голода
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth, hungerBarHeight);

        // Заполнение индикатора голода
        ctx.fillStyle = `rgba(255, 0, 0, ${hungerPercentage})`;
        ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth * hungerPercentage, hungerBarHeight);
    }
}
