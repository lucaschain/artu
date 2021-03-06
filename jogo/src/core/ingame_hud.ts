import { Store } from '../infra/store'

import { MemoryList } from '../entity/hud/memory_list'
import { LevelTitle } from '../entity/hud/level_title'
import { InstructionPanel } from '../entity/hud/instruction_panel'
import { InstructionList } from '../entity/hud/instruction_list'
import { ScorePanel } from '../entity/hud/score_panel'
import { BackButton } from '../entity/hud/back_button'

import { MemoryShard } from './memory'
import { Hero } from './hero'
import { LevelConfiguration } from './level_configuration'
import { Instruction, InstructionFactory, InstructionRunner } from './instruction'

export class IngameHud {
  private instructionPanel: InstructionPanel
  private instructionList: InstructionList
  private levelTitle: LevelTitle
  private memoryList: MemoryList
  private scorePanel: ScorePanel
  private backButton: BackButton
  private shouldStop = false
  private isRunning = false
  private instructionRunner: InstructionRunner

  constructor(
    private levelLabel: string,
    private memoryStore: Store<MemoryShard[]>,
    private scoreStore: Store<number>,
    private instructionStore: Store<Instruction[]>,
    private resetCallback: () => Promise<void>,
    private eraseLastInstructionCallback: () => () => void,
    private clearCallback: () => () => void
  ) { }

  create(levelConfig: LevelConfiguration, hero: Hero) {
    const availableInstructions = InstructionFactory(
      hero,
      levelConfig.availableInstructions
    )
    const availableInstructionStore = new Store<Instruction[]>(availableInstructions)

    this.levelTitle = new LevelTitle(new Store<string>(this.levelLabel))
    this.levelTitle.spawn()

    this.instructionPanel = new InstructionPanel(
      availableInstructionStore,
      this.instructionStore
    )
    this.instructionPanel.spawn()

    this.memoryList = new MemoryList(this.memoryStore)
    this.memoryList.spawn()

    this.scorePanel = new ScorePanel(this.scoreStore)
    this.scorePanel.spawn()

    this.backButton = new BackButton(new Store<void>(undefined))
    this.backButton.spawn()

    this.instructionList = this.createInstructionList(availableInstructions)
    this.instructionList.spawn()
  }

  destroy() {
    this.levelTitle.destroy()
    this.memoryList.destroy()
    this.instructionList.destroy()
    this.instructionPanel.destroy()
    this.scorePanel.destroy()
    this.backButton.destroy()
  }

  private reset(): Promise<void> {
    this.shouldStop = true
    return this.resetCallback()
  }

  private async restart() {
    await this.reset()
    this.shouldStop = false
  }

  private createInstructionList(availableInstructions: Instruction[]): InstructionList {
    this.instructionRunner = new InstructionRunner(
      availableInstructions
    )
    const runInstructionsCallback = async (instructionList: string[]) => {
      if (this.isRunning) {
        return
      }
      this.isRunning = true

      await this.restart()
      await this.instructionRunner.runInstructions(
        instructionList,
        () => this.shouldStop
      )

      this.isRunning = false
    }

    const eraseLastInstructionCallback = () => {
      this.reset()
      this.eraseLastInstructionCallback()
    }

    const clearInstructionsCallback = () => {
      this.reset()
      this.clearCallback()
    }

    return new InstructionList(
      this.instructionStore,
      runInstructionsCallback,
      eraseLastInstructionCallback,
      clearInstructionsCallback
    )
  }
}
