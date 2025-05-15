import { sizeUpdater } from './components/sizeUpdater'
import { Game } from './Game/Game'

const container = document.getElementById('app')

if (container) {
    const game = new Game(container)
    game.start()

    const defaultSize = 100

    const sizeUpdaterElement = sizeUpdater({
        initialValue: defaultSize,
        onChange: (size) => game.board.init({ size }),
    })
    container.appendChild(sizeUpdaterElement)
}