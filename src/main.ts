import { Game } from './Game/Game'

const container = document.getElementById('app')

if (container) {
    const game = new Game(container)
    game.start()
}