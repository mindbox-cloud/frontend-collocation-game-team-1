import { Cell } from "~/Cell/Cell";

interface Position {
    x: number;
    y: number;
}

export class AntWorker extends Cell  {
    // Направление и расстояние до матки
    private _directionToQueen: Position = { x: 0, y: 0 };
    private _distanceToQueen: number = 0;
    
    // Направление и расстояние до еды
    private _directionToFood: Position = { x: 0, y: 0 };
    private _foodSmellStrength: number = 0;
    
    // Феромоны
    private _pheromoneLevel: number = 0;
    private _hasPheromone: boolean = false;
    
    protected _stepsWithoutFood: number = 0;
    protected _maxStepsWithoutFood: number = 0;
    
    constructor(x: number, y: number, size: number, i: number, j: number, maxStepsWithoutFood: number) {
        super(x, y, size, i, j);
        this._maxStepsWithoutFood = maxStepsWithoutFood;
    }

    public get directionToQueen(): Position {
        return this._directionToQueen;
    }

    public get distanceToQueen(): number {
        return this._distanceToQueen;
    }

    public get directionToFood(): Position {
        return this._directionToFood;
    }

    public get foodSmellStrength(): number {
        return this._foodSmellStrength;
    }

    public get pheromoneLevel(): number {
        return this._pheromoneLevel;
    }

    public get hasPheromone(): boolean {
        return this._hasPheromone;
    }
    
    // Обновление информации о еде
    updateFoodInfo(foodX: number, foodY: number, smellRadius: number) {
        const dx = foodX - this.x;
        const dy = foodY - this.y;
        
        // Нормализуем вектор направления
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) {
            this._directionToFood = { x: 0, y: 0 };
            this._foodSmellStrength = 1; // Максимальная сила запаха, если муравей на еде
        } else {
            this._directionToFood = {
                x: dx / distance,
                y: dy / distance
            };

            this._foodSmellStrength = Math.max(0, 1 - distance / smellRadius);
        }
    }

    // Обновление информации о матке
    updateQueenInfo(queenX: number, queenY: number) {
        const dx = queenX - this.x;
        const dy = queenY - this.y;
        
        // Нормализуем вектор направления
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) {
            this._directionToQueen = { x: 0, y: 0 };
            this._distanceToQueen = 0;
        } else {
            this._directionToQueen = {
                x: dx / distance,
                y: dy / distance
            };
            
            this._distanceToQueen = distance;
        }
    }

    // Работа с феромонами
    leavePheromone(level: number) {
        this._pheromoneLevel = level;
        this._hasPheromone = true;
    }

    clearPheromone() {
        this._pheromoneLevel = 0;
        this._hasPheromone = false;
    }

    move(x: number, y: number) {
        if (!this.isAlive()) return;

        this.x = x;
        this.y = y;
        this._stepsWithoutFood++;
    }

    public isAlive(): boolean {
        return this._stepsWithoutFood < this._maxStepsWithoutFood;
    }

    public tick(): void {
        if (!this.isAlive()) return;

        // Уменьшаем уровень феромонов
        if (this._hasPheromone) {
            this._pheromoneLevel = Math.max(0, this._pheromoneLevel - 0.1);
            if (this._pheromoneLevel === 0) {
                this._hasPheromone = false;
            }
        }

        // Увеличиваем счетчик голода
        this._stepsWithoutFood++;
    }

    die(): void {
        this._stepsWithoutFood = this._maxStepsWithoutFood;
    }

    public drawAnt(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        
        // Дополнительная отрисовка для муравья
        const centerX = this._x + this.size / 2;
        const centerY = this._y + this.size / 2;
        const radius = this.size / 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'darkpurple';
        ctx.stroke();

        // Отображение состояния голода
        // const hungerPercentage = this._foodCount / this._maxFoodCount;
        // const hungerBarHeight = 4;
        // const hungerBarWidth = this.size * 0.8;
        // const hungerBarX = this._x + this.size * 0.1;
        // const hungerBarY = this._y + this.size - hungerBarHeight - 2;

        // Фон индикатора голода
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        // ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth, hungerBarHeight);

        // // Заполнение индикатора голода
        // ctx.fillStyle = `rgba(255, 0, 0, ${hungerPercentage})`;
        // ctx.fillRect(hungerBarX, hungerBarY, hungerBarWidth * hungerPercentage, hungerBarHeight);
    }
}