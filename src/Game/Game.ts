import { Board } from "~/Board/Board";
import {  CellColor } from "~/Cell/Cell";
import { sizeUpdater } from "~/components/sizeUpdater";
import { DEFAULT_SIZE } from "~/constants";
export class Game {
    public board: Board;
    private isRunning: boolean = false;
    private tickInterval: number = 1000; // 1 second interval
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        const canvas = document.createElement('canvas')
        container.appendChild(canvas)
        this.board = new Board(canvas);
    }

    public start(): void {
        if (this.isRunning) return;
        
        this.board.init({ size: DEFAULT_SIZE });

        const sizeUpdaterElement = sizeUpdater({
            initial: DEFAULT_SIZE,
            onChange: (size) => this.board.init({ size }),
        })
        this.container.appendChild(sizeUpdaterElement)

        this.isRunning = true;
        
        // Start the ticker
        this.intervalId = setInterval(() => {
            this.tick();
        }, this.tickInterval);
    }

    public stop(): void {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private tick(): void {
        // Here you can implement the logic for each tick
        // For example, updating cell states, checking game rules, etc.
        this.updateCells();
        this.board._drawBoard();
    }

    // TODO: Remove after self-implementation
    private updateCells(): void {
        const cells = this.board.board;
        
        // Example: Randomly change some cell colors
        const colors: Array<CellColor> = 
            ['red', 'green', 'blue', 'yellow', 'white'];
            
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (Math.random() < 0.1) { // 10% chance to change color
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    cells[i][j].color = randomColor;
                }
            }
        }
    }

    public setTickInterval(interval: number): void {
        this.tickInterval = interval;
        if (this.isRunning) {
            this.stop();
            this.start();
        }
    }

    public get running(): boolean {
        return this.isRunning;
    }
}