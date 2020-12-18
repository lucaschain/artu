import { Board } from './board'
import { Hero, Direction } from './hero'

export default class Game {

  async start() {
    const board = new Board(5, 5, [])
    const hero = new Hero(board, {x: 0,y: 0})

    setTimeout(async () => {
      await hero.moveTo({x: 1, y: 0})
      await hero.rotateTo(Direction.Down)
      await hero.moveTo({x: 1, y: 1})
    }, 1000)
  }
}
