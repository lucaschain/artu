import { Store } from '../infra/store'

import { SaveLevelState, LevelState } from '../infra/save'

import { MemoryShard } from './memory'
import { LevelConfiguration } from './level_configuration'
import { Board } from './board'
import { Hero } from './hero'
import { IngameHud } from './ingame_hud'
import { Instruction } from './instruction'
import { LevelSelection as LevelSelectionEntity } from '../entity/hud/level_selection'

export class Game {
  private hero: Hero
  private ingameHud: IngameHud
  private board: Board
  private instructionStore = new Store<Instruction[]>([])
  private memoryStore = new Store<MemoryShard[]>([])
  private scoreStore = new Store<number>(0)
  private levelSelectionEntity: LevelSelectionEntity
  private levelList: LevelConfiguration[] = []
  private currentLevelIndex: number = 0

  public loadLevel(levelConfig: LevelConfiguration): void {

    this.board = new Board(
      levelConfig.width,
      levelConfig.height,
      levelConfig.tiles
    )

    this.hero = new Hero(this.board, {x: 0,y: 0}, this.memoryStore)
    this.createHud(levelConfig)
  }

  public async toLevelSelection() {
    this.unloadLevel()
    this.levelSelectionEntity = new LevelSelectionEntity(
      new Store<LevelConfiguration[]>(this.levelList),
      level => {
        if (!level) { return }
        this.levelSelectionEntity.destroy()
        this.loadLevel(level)
      }
    )

    this.levelSelectionEntity.spawn()
  }

  public async toNextLevel() {
    this.saveLevel()
    if (this.nextLevel) {
      await this.unloadLevel()
      this.loadLevel(this.nextLevel)
      this.currentLevelIndex++
    }
  }

  public increaseScore(amount = 1) {
    const currentScore = this.scoreStore.current
    this.scoreStore.update(currentScore + amount)
  }

  public registerLevels(...levels: LevelConfiguration[]): void {
    this.levelList.push(...levels)
  }

  private async unloadLevel() {
    this.clear()
    this.reset()
    this.ingameHud?.destroy()
    this.board?.destroy()
  }

  private async reset() {
    this.scoreStore.update(0)
    await this.hero?.reset()
    this.board?.reset()
  }

  private clear(): void {
    this.instructionStore.update([])
  }

  private createHud(levelConfig: LevelConfiguration) {
    this.ingameHud = new IngameHud(
      this.memoryStore,
      this.scoreStore,
      this.instructionStore,
      this.reset.bind(this),
      this.clear.bind(this),
    )
    this.ingameHud.create(levelConfig, this.hero)
  }

  private get currentLevel(): LevelConfiguration {
    return this.levelList[this.currentLevelIndex]
  }

  private get nextLevel(): LevelConfiguration {
    return this.levelList[this.currentLevelIndex + 1]
  }

  private saveLevel() {
    SaveLevelState(this.currentLevel.name, LevelState.Completed, this.scoreStore.current)
  }
}

let gameInstance: Game
export const GameInstance = (): Game => {
  if (!gameInstance) {
    gameInstance = new Game()
  }
  return gameInstance
}
