import { Instruction } from './../../core/instruction'
import { Component } from './component'
import { Store } from '.././../infra/store'
import * as template from './template/instruction_list.hbs'

type RunInstructionsCallback = (instructionList: string[]) => void
type ClearInstructionsCallback = () => void
type EraseLastInstructionCallback = () => void

export class InstructionList extends Component<Instruction[]> {
  protected get additionalElementClassList(): string[] {
    return ['instruction-list']
  }

  constructor(
    store: Store<Instruction[]>,
    private runInstructionsCallback: RunInstructionsCallback = (_list: string[]) => {},
    private eraseLastInstructionCallback: EraseLastInstructionCallback = () => {},
    private clearInstructionsCallback: ClearInstructionsCallback = () => {},
  ) {
    super(store)
  }

  render(state: Instruction[]): string {
    return template({
      instructions: state
    })
  }

  bindEvents() {
    const eraseLastButton = this.root.querySelector('#erase-last-instruction')
    eraseLastButton?.addEventListener('click', () => {
      this.eraseLastInstructionCallback()
    })

    const runButton = this.root.querySelector("#run-instructions")
    runButton?.addEventListener('click', () => {
      const list = this.store.current.map(instruction => instruction.name)
      this.runInstructionsCallback(list)
    })

    const clearButton = this.root.querySelector("#clear-instructions")
    clearButton?.addEventListener('click', () => {
      this.clearInstructionsCallback()
    })
  }
}
