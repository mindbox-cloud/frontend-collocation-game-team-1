import {Board} from '~/Board/Board'
import {sizeUpdater} from '~/components/sizeUpdater'
import {DEFAULT_SIZE} from '~/constants'
export class Game {
  public board: Board
  private isRunning: boolean = false
  private tickInterval: number = 1000 // 1 second interval
  private intervalId: ReturnType<typeof setInterval> | null = null
  private container: HTMLElement
  private gameSettings: {
    queensCount: number
    createAntWithFoodProbability: number
    createAntWithoutFoodProbability: number
    goodsCount: number
    queenDeathSteps: number
    antDeathSteps: number
  } = {
    queensCount: 5,
    createAntWithFoodProbability: 0.5,
    createAntWithoutFoodProbability: 0.5,
    goodsCount: 5,
    queenDeathSteps: 3,
    antDeathSteps: 3,
  }

  constructor(container: HTMLElement) {
    this.container = container
    const canvas = document.createElement('canvas')
    this.container.appendChild(canvas)
    this.board = new Board({
      canvas,
      ...this.gameSettings,
    })
  }

  public start(): void {
    if (this.isRunning) return

    this.board.init({size: DEFAULT_SIZE})

    const sizeUpdaterElement = sizeUpdater({
      initial: DEFAULT_SIZE,
      onChange: size => this.board.init({size}),
    })
    this.container.prepend(sizeUpdaterElement)

    this.isRunning = true

    // Start the ticker
    this.intervalId = setInterval(() => {
      this.tick()
    }, this.tickInterval)
  }

  public stop(): void {
    if (!this.isRunning) return

    this.isRunning = false
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private tick(): void {
    // this.board._drawBoard()
  }

  public setTickInterval(interval: number): void {
    this.tickInterval = interval
    if (this.isRunning) {
      this.stop()
      this.start()
    }
  }

  public get running(): boolean {
    return this.isRunning
  }
}
