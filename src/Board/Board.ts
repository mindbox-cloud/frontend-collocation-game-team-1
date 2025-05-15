import {Cell} from '~/Cell/Cell'
import {Good} from '~/Good/Good'
import {Queen} from '~/Queen/Queen'
import {Food} from '~/Food/Food';
import {AntWorker} from '~/AntWorker/AntWorker';

interface BoardParams {
  canvas: HTMLCanvasElement
  queensCount: number
  createAntWithFoodProbability: number
  createAntWithoutFoodProbability: number
  goodsCount: number
  queenDeathSteps: number
  antDeathSteps: number
}
export class Board {
  _canvas: HTMLCanvasElement
  _board: Cell[][] = []
  _rows: number = 100
  _cols: number = 100
  _cellSize: number = 50
  _ctx: CanvasRenderingContext2D
  private queensCount: number
  private createAntWithFoodProbability: number
  private createAntWithoutFoodProbability: number
  private goodsCount: number
  private queenDeathSteps: number
  private antDeathSteps: number

  constructor(params: BoardParams) {
    this.queensCount = params.queensCount
    this.createAntWithFoodProbability = params.createAntWithFoodProbability
    this.createAntWithoutFoodProbability = params.createAntWithoutFoodProbability
    this.goodsCount = params.goodsCount
    this.queenDeathSteps = params.queenDeathSteps
    this.antDeathSteps = params.antDeathSteps
    this._canvas = params.canvas
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
  }

  init({size}: {size: {n: number; m: number}}) {
    this._updateBoardSize(size)
    this._canvas.width = this._rows * this._cellSize
    this._canvas.height = this._cols * this._cellSize
    this._fillBoard()
    this._drawBoard()
    this.createInitialEntities(this.queensCount, 'queen')
    this.createInitialEntities(this.goodsCount, 'good')
  }

  get board(): Cell[][] {
    return this._board
  }

  private createInitialEntities(count: number, entityType: 'queen' | 'good') {
    const cellsToReplace: Cell[] = []
    for (let i = 0; i < count; i++) {
      let randomRow: number, randomCol: number
      do {
        randomRow = Math.floor(Math.random() * this._rows)
        randomCol = Math.floor(Math.random() * this._cols)
      } while (cellsToReplace.find(cell => cell.i === randomRow && cell.j === randomCol))
      if (this._board[randomRow][randomCol].agent !== null) {
        i--
        continue
      }
      cellsToReplace.push(this._board[randomRow][randomCol])
    }
    cellsToReplace.forEach((cell) => {
        let entity: Good | Queen;
        if (entityType === 'queen') {
          entity = new Queen(cell.x, cell.y, this._cellSize, cell.i, cell.j, this.queenDeathSteps);
          entity.drawQueen(this._ctx);
        } else {
          entity = new Good(cell.x, cell.y, this._cellSize, cell.i, cell.j);
          entity.drawGood(this._ctx);
        }
        this._board[cell.i][cell.j] = entity;
      });
  }

  _updateBoardSize(size: {n: number; m: number}) {
    this._rows = size.n
    this._cols = size.m
  }

  _fillBoard() {
    for (let i = 0; i < this._rows; i++) {
      this._board[i] = []
      for (let j = 0; j < this._cols; j++) {
        this._board[i][j] = new Cell(j * this._cellSize, i * this._cellSize, this._cellSize, i, j)
      }
    }
  }

  _drawBoard() {
    this._ctx.beginPath()
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        this._board[i][j].draw(this._ctx)
      }
    }
  }

  public tick(): void {
    // Обновляем состояние всех клеток
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        const cell = this._board[i][j];
        
        // Генерация еды в едохранилищах
        if (cell.agent === 'good') {
          // Случайная генерация еды
          if (Math.random() < 0.1) { // 10% шанс генерации еды
            const emptyNeighbors = this.getEmptyNeighbors(i, j);
            if (emptyNeighbors.length > 0) {
              const randomPos = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)];
              const food = new Food(randomPos.x * this._cellSize, randomPos.y * this._cellSize, this._cellSize, randomPos.y, randomPos.x);
              this._board[randomPos.y][randomPos.x] = food;
            }
          }
        }

        // Обновление маток
        if (cell.agent === 'queen') {
          const queen = cell as Queen;
          queen.tick();

          // Проверка наличия еды рядом
          const hasNearbyFood = this.checkNearbyFood(i, j);
          
          // Попытка создания нового муравья
          const ant = queen.createAnt(hasNearbyFood, this.createAntWithFoodProbability, this.createAntWithoutFoodProbability, this.antDeathSteps);
          if (ant) {
            const emptyNeighbors = this.getEmptyNeighbors(i, j);
            if (emptyNeighbors.length > 0) {
              const randomPos = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)];
              this._board[randomPos.y][randomPos.x] = ant;
              ant.drawAnt(this._ctx);
            }
          }
        }

        // Обновление муравьев
        if (cell.agent === 'ant') {
          const ant = cell as AntWorker;
          ant.tick();
        }
      }
    }

    // Перерисовка доски
    // this._drawBoard();
    console.log(this._board);
    
  }

  private getEmptyNeighbors(i: number, j: number): Array<{x: number, y: number}> {
    const neighbors: Array<{x: number, y: number}> = [];
    
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        
        const newI = i + di;
        const newJ = j + dj;
        
        if (newI >= 0 && newI < this._rows && newJ >= 0 && newJ < this._cols) {
          if (this._board[newI][newJ].agent === null) {
            neighbors.push({x: newJ, y: newI});
          }
        }
      }
    }
    
    return neighbors;
  }

  private checkNearbyFood(i: number, j: number): boolean {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        
        const newI = i + di;
        const newJ = j + dj;
        
        if (newI >= 0 && newI < this._rows && newJ >= 0 && newJ < this._cols) {
          if (this._board[newI][newJ].agent === 'food') {
            return true;
          }
        }
      }
    }
    
    return false;
  }
}
