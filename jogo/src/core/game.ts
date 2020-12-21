import { Board } from './board'
import { Hero } from './hero'
import { Store } from '../infra/store'
import { InstructionPanel } from '../entity/hud/instruction_panel'
import { InstructionList } from '../entity/hud/instruction_list'
import { Instruction, InstructionFactory, RunInstructions } from './instruction'

export default class Game {
  private hero: Hero
  private instructionStore = new Store<Instruction[]>([])
  private shouldStop = false

  constructor() {
    const board = new Board(5, 5, [])
    this.hero = new Hero(board, {x: 0,y: 0})
  }

  start(): void {
    this.createHud()
  }

  private async reset() {
    this.shouldStop = true
    await this.hero.reset()
  }

  private clear(): void {
    this.instructionStore.update([])
  }

  private async restart() {
    await this.reset()
    this.shouldStop = false
  }

  private createHud() {
    const allInstructions = InstructionFactory(this.hero)
    const availableInstructionStore = new Store<Instruction[]>(allInstructions)
    new InstructionPanel(
      {},
      availableInstructionStore,
      this.instructionStore
    ).spawn()

    new InstructionList({}, this.instructionStore,
      async (instructionList) => {
        await this.restart()
        RunInstructions(
          allInstructions,
          instructionList,
          () => this.shouldStop
        )
      },
      () => {
        this.reset()
        this.clear()
      }
    ).spawn()
  }
}
