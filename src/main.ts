import { sizeUpdater } from './components/sizeUpdater'
import { Board } from "./Board/Board"

const container = document.getElementById('app')

if (container) {
    const canvas = document.createElement('canvas')
    canvas.width = 1000
    canvas.height = 1000
    container.appendChild(canvas)

    const defaultSize = 100

    const board = new Board(canvas)
    board.init({ size: defaultSize })

    const sizeUpdaterElement = sizeUpdater({
        initialValue: defaultSize,
        onChange: (size) => board.init({ size }),
    })
    container.appendChild(sizeUpdaterElement)
}