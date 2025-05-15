import { sizeUpdater } from './components/sizeUpdater'
import { Game } from './Game/Game'

const container = document.getElementById('app')

if (container) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1000
    canvas.height = 1000
    container.appendChild(canvas)

    const defaultSize = 100

    const game = new Game(ctx)
    game.start()

    const sizeUpdaterElement = sizeUpdater({
        initialValue: defaultSize,
        onChange: (size) => game.board.init({ size }),
    })
    container.appendChild(sizeUpdaterElement)
}