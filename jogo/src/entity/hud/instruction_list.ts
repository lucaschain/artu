import { Instruction } from './../../core/instruction'
import { Component } from './component'
import { Store } from '.././../infra/store'
import { EntityConfiguration } from '../entity'
import * as template from './template/instruction_list.hbs'

type RunInstructionsCallback = (instructionList: string[]) => void
type ClearInstructionsCallback = () => void

export class InstructionList extends Component<Instruction[]> {
  protected get elementClassList(): string[] { return ['hud-panel', 'instruction-list'] }

  constructor(
    config: EntityConfiguration,
    store: Store<Instruction[]>,
    private runInstructionsCallback: RunInstructionsCallback = (list: string[]) => {},
    private clearInstructionsCallback: ClearInstructionsCallback = () => {},
  ) {
    super(config, store)
  }

  render(state: Instruction[]): string {
    return template({
      instructions: state
    })
  }

  bindEvents() {
    const runButton = this.root.querySelector("#run-instructions")
    runButton && runButton.addEventListener('click', () => {
      const list = this.store.current.map(instruction => instruction.name)
      this.runInstructionsCallback(list)
    })

    const clearButton = this.root.querySelector("#clear-instructions")
    clearButton && clearButton.addEventListener('click', () => {
      this.clearInstructionsCallback()
    })
  }
}
