import { Instruction } from './../../core/instruction'
import { Store } from '../../infra/store'
import { EntityConfiguration } from '../entity'
import { Component } from './component'
import * as template from './template/instruction_panel.hbs'

export class InstructionPanel extends Component<Instruction[]> {
  constructor(
    config: EntityConfiguration,
    private availableInstructionStore: Store<Instruction[]>,
    private instructionStore: Store<Instruction[]>,
  ) {
    super(config, availableInstructionStore)
  }

  render(state: Instruction[]): string {
    return template({
      instructions: state
    })
  }

  protected get elementClassList(): string[] {
    return ['hud-panel', 'instruction-panel']
  }

  protected bindEvents() {
    const listItems = this.root.querySelectorAll('li')

    listItems.forEach((listItem) => {
      listItem.addEventListener('click', (_e) => {
        const instructionName = listItem.getAttribute('data-name')

        if (instructionName) {
          this.addInstructionByName(instructionName)
        }
      })
    })
  }

  private addInstructionByName(instructionName: string) {
    const instruction = this.instructionByName(instructionName)

    if (instruction) {
      this.instructionStore.update([
        ...this.instructionStore.current,
        instruction
      ])
    }
  }

  private instructionByName?(name: string): Instruction {
    const isInstruction = (ins: Instruction) => {
      return ins.name === name
    }

    return this.availableInstructionStore
      .current
      .filter(isInstruction)[0]
  }
}
