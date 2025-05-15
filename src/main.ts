import { Board } from "./Board/Board"

const container = document.getElementById('app')

if (container) {
    const sizeInput = document.createElement('input')
    sizeInput.type = 'number'
    sizeInput.value = '100'
    container.appendChild(sizeInput)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 500
    canvas.height = 500
    container.appendChild(canvas)

    const board = new Board(ctx)
    board.draw()
}