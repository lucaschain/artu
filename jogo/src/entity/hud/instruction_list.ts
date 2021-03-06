import { Instruction } from './../../core/instruction'
import { Binding, Component } from './component'
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
    const output = template({
      instructions: state
    })

    return output
  }

  afterRender() {
    const ul = this.root.querySelector('ul')

    if (ul && ul.scrollTo) {
      ul.scrollTo({
        top: ul.scrollHeight
      })
    }
  }

  protected get globalBindings(): Binding[] {
    return [
      {
        elements: document.querySelectorAll('body'),
        action: this.onKeyDown.bind(this),
        event: 'keydown',
      }
    ]
  }

  protected get localBindings(): Binding[] {
    return [
      {
        elements: this.root.querySelectorAll('#erase-last-instruction'),
        action: this.eraseLastInstructionCallback,
        event: 'mousedown'
      },
      {
        elements: this.root.querySelectorAll('#run-instructions'),
        action: this.runInstructions.bind(this),
        event: 'click'
      },
      {
        elements: this.root.querySelectorAll('#clear-instructions'),
        action: this.clearInstructionsCallback,
        event: 'click'
      },
    ]
  }

  private runInstructions(_event: Event) {
    const list = this.store.current.map(instruction => instruction.name)
    this.runInstructionsCallback(list)
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.isDestroyed) {
      return
    }
    event.preventDefault()
    switch (event.code) {
      case 'Backspace':
        this.eraseLastInstructionCallback()
        break
      case 'Space':
        this.runInstructions(event)
        break
    }
  }
}
