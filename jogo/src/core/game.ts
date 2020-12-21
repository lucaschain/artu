import { LevelConfiguration } from './level_configuration'
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

  loadLevel(levelConfig: LevelConfiguration): void {
    const board = new Board(
      levelConfig.width,
      levelConfig.height,
      levelConfig.tiles
    )

    this.hero = new Hero(board, {x: 0,y: 0})
    this.createHud(levelConfig)
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

  private createHud(levelConfig: LevelConfiguration) {
    const availableInstructions = InstructionFactory(this.hero, levelConfig.availableInstructions)
    const availableInstructionStore = new Store<Instruction[]>(availableInstructions)
    new InstructionPanel(
      {},
      availableInstructionStore,
      this.instructionStore
    ).spawn()

    new InstructionList({}, this.instructionStore,
      async (instructionList) => {
        await this.restart()
        RunInstructions(
          availableInstructions,
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
