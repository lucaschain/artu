import { Store } from '../infra/store'

import { InstructionPanel } from '../entity/hud/instruction_panel'
import { InstructionList } from '../entity/hud/instruction_list'
import { MemoryList } from '../entity/hud/memory_list'

import { MemoryShard } from './memory'
import { LevelConfiguration } from './level_configuration'
import { Board } from './board'
import { Hero } from './hero'
import { Instruction, InstructionFactory, RunInstructions } from './instruction'

export class Game {
  private hero: Hero
  private board: Board
  private instructionStore = new Store<Instruction[]>([])
  private memoryStore = new Store<MemoryShard[]>([])
  private shouldStop = false
  private isRunning = false
  private levelList: LevelConfiguration[] = []
  private currentLevel: number = 0
  private instructionPanel: InstructionPanel
  private instructionList: InstructionList
  private memoryList: MemoryList

  public loadLevel(levelConfig: LevelConfiguration): void {
    this.board = new Board(
      levelConfig.width,
      levelConfig.height,
      levelConfig.tiles
    )

    this.hero = new Hero(this.board, {x: 0,y: 0}, this.memoryStore)
    this.createHud(levelConfig)
  }

  public async nextLevel() {
    const nextLevel = this.currentLevel + 1
    const nextLevelExists = nextLevel < this.levelList.length
    if (nextLevelExists) {
      await this.unloadLevel()
      this.currentLevel = nextLevel
      this.loadLevel(this.levelList[this.currentLevel])
    }
  }

  public registerLevels(...levels: LevelConfiguration[]): void {
    this.levelList.push(...levels)
  }

  private async unloadLevel() {
    this.clear()
    this.reset()
    this.memoryList.destroy()
    this.instructionList.destroy()
    this.instructionPanel.destroy()
    this.board.destroy()
  }

  private async reset() {
    this.shouldStop = true
    await this.hero.reset()
    this.board.reset()
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

    this.instructionPanel = new InstructionPanel(
      availableInstructionStore,
      this.instructionStore
    )
    this.instructionPanel.spawn()

    this.memoryList = new MemoryList(this.memoryStore)
    this.memoryList.spawn()

    this.instructionList = new InstructionList(this.instructionStore,
      async (instructionList) => {
        if (this.isRunning) {
          return
        }
        this.isRunning = true

        await this.restart()
        await RunInstructions(
          availableInstructions,
          instructionList,
          () => this.shouldStop
        )

        this.isRunning = false
      },
      () => {
        this.reset()
        this.clear()
      }
    )
    this.instructionList.spawn()
  }
}

let gameInstance: Game
export const GameInstance = (): Game => {
  if (!gameInstance) {
    gameInstance = new Game()
  }
  return gameInstance
}
