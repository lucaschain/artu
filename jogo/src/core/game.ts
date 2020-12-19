import { Board } from './board'
import { Hero } from './hero'
import { InstructionFactory, RunInstructions } from './instruction'

export default class Game {
  private hero: Hero

  constructor() {
    const board = new Board(5, 5, [])
    this.hero = new Hero(board, {x: 0,y: 0})
  }

  start(): void {
    const allInstructions = InstructionFactory(this.hero)
    setTimeout(async () => {
      await RunInstructions(allInstructions, [
        'move', 'move', 'turn_right'
      ])

      await this.hero.reset()

      await RunInstructions(allInstructions, [
        'move', 'move', 'turn_right'
      ])
    }, 0)
  }
}
