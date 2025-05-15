import { sizeUpdater } from './components/sizeUpdater'

const container = document.getElementById('app')

if (container) {
    const sizeUpdaterElement = sizeUpdater({ onChange: console.log })
    container.appendChild(sizeUpdaterElement)

    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    container.appendChild(canvas)
}