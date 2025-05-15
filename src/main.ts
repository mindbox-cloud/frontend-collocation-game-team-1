import { sizeUpdater } from './components/sizeUpdater'
import { Board } from "./Board/Board"

const container = document.getElementById('app')

if (container) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1000
    canvas.height = 1000
    container.appendChild(canvas)

    const defaultSize = 100

    const board = new Board(ctx)
    board.init({ size: defaultSize })

    const sizeUpdaterElement = sizeUpdater({
        initialValue: defaultSize,
        onChange: (size) => board.init({ size }),
    })
    container.appendChild(sizeUpdaterElement)
}