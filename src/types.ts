export type Position = {
    x: number;
    y: number;
}

export type CellType = 'empty' | 'ant' | 'queen' | 'food' | 'foodStorage';

export interface GameConfig {
    queensCount: number;           // M: Количество маток
    createAntWithFoodProb: number; // P1: Вероятность создания муравья при наличии еды
    createAntWithoutFoodProb: number; // P2: Вероятность создания муравья без еды
    foodStorageCount: number;      // E: Количество едохранилищ
    antDeathSteps: number;         // X: Ходы до смерти муравья от голода
    queenDeathSteps: number;       // Y: Ходы до смерти матки от голода
    boardSize: {
        width: number;
        height: number;
    };
    cellSize: number;
    smellRadius: number;          // Радиус, в котором муравьи чувствуют запах еды
}
