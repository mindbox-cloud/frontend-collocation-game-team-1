import { sizeUpdater } from './components/sizeUpdater'
import { Board } from "./Board/Board"

const container = document.getElementById('app')

if (container) {
    const sizeUpdaterElement = sizeUpdater({ onChange: console.log })
    container.appendChild(sizeUpdaterElement)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1000
    canvas.height = 1000
    container.appendChild(canvas)

    const board = new Board(ctx)
    board.init()
}