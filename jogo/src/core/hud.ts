import { Store } from '../infra/store'

import { MemoryList } from '../entity/hud/memory_list'
import { InstructionPanel } from '../entity/hud/instruction_panel'
import { InstructionList } from '../entity/hud/instruction_list'
import { ScorePanel } from '../entity/hud/score_panel'

import { MemoryShard } from './memory'
import { Hero } from './hero'
import { LevelConfiguration } from './level_configuration'
import { Instruction, InstructionFactory, RunInstructions } from './instruction'

export class Hud {
  private instructionPanel: InstructionPanel
  private instructionList: InstructionList
  private memoryList: MemoryList
  private scorePanel: ScorePanel
  private shouldStop = false
  private isRunning = false

  constructor(
    private memoryStore: Store<MemoryShard[]>,
    private scoreStore: Store<number>,
    private instructionStore: Store<Instruction[]>,
    private resetCallback: () => Promise<void>,
    private clearCallback: () => () => void
  ) {
  }

  create(levelConfig: LevelConfiguration, hero: Hero) {
    const availableInstructions = InstructionFactory(
      hero,
      levelConfig.availableInstructions
    )
    const availableInstructionStore = new Store<Instruction[]>(availableInstructions)

    this.instructionPanel = new InstructionPanel(
      availableInstructionStore,
      this.instructionStore
    )
    this.instructionPanel.spawn()

    this.memoryList = new MemoryList(this.memoryStore)
    this.memoryList.spawn()

    this.scorePanel = new ScorePanel(this.scoreStore)
    this.scorePanel.spawn()

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
        this.clearCallback()
      }
    )
    this.instructionList.spawn()
  }

  destroy() {
    this.memoryList.destroy()
    this.instructionList.destroy()
    this.instructionPanel.destroy()
  }

  private reset(): Promise<void> {
    this.shouldStop = true
    return this.resetCallback()
  }

  private async restart() {
    await this.reset()
    this.shouldStop = false
  }

}
