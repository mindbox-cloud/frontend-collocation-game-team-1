import { sizeUpdater } from './components/sizeUpdater'
import { Board } from "./Board/Board"

const container = document.getElementById('app')

if (container) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1000
    canvas.height = 1000
    container.appendChild(canvas)

    const board = new Board(ctx)
    board.init()

    let size = 100
    const sizeUpdaterElement = sizeUpdater({
        initialValue: size,
        onChange: (size) => board.updateBoardSize(size),
    })
    container.appendChild(sizeUpdaterElement)
}