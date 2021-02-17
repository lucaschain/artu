import { Instruction } from './../../core/instruction'
import { Store } from '../../infra/store'
import { Binding, Component } from './component'
import * as template from './template/instruction_panel.hbs'

export class InstructionPanel extends Component<Instruction[]> {
  constructor(
    private availableInstructionStore: Store<Instruction[]>,
    private instructionStore: Store<Instruction[]>,
  ) {
    super(availableInstructionStore)
  }

  render(state: Instruction[]): string {
    return template({
      instructions: state
    })
  }

  protected get additionalElementClassList(): string[] {
    return ['instruction-panel']
  }

  protected get localBindings(): Binding[] {
    return [{
      event: 'click',
      elements: this.root.querySelectorAll('li'),
      action: this.onClickListItem.bind(this)
    }]
  }

  protected get globalBindings(): Binding[] {
    return [{
      event: 'keydown',
      elements: document.querySelectorAll('body'),
      action: this.onKeyPress.bind(this)
    }]
  }

  private onKeyPress(event: KeyboardEvent) {
    if (this.isDestroyed) {
      return
    }
    const listItems = this.root.querySelectorAll('li')
    const { key } = event

    const availableKeys = "qwertyuiop".split('')
    if (availableKeys.includes(key)) {
      const commandIndex = availableKeys.indexOf(key)
      const listItem = listItems[commandIndex]

      if (!listItem) {
        return
      }

      this.addInstructionByElement(listItem)
    }
  }

  private addInstructionByElement(el: HTMLElement) {
    const instructionName = el.getAttribute('data-name')

    if (!instructionName) {
      return
    }
    this.addInstructionByName(instructionName)
  }

  private onClickListItem(event: Event) {
    const element = event.target as HTMLElement
    this.addInstructionByElement(element)
  }

  private addInstructionByName(instructionName: string) {
    const instruction = this.instructionByName(instructionName)

    if (!instruction) {
      return
    }

    this.instructionStore.update([
      ...this.instructionStore.current,
      instruction
    ])
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
