import { Div } from '../infra/dom'
import { Entity } from './entity'

export class Board extends Entity {
  constructor(
    private width: number,
    private height: number,
  ) { super("board") }

  protected elementStyle() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }

  protected createElement(): HTMLDivElement {
    const outerDiv = Div({
      classList: ['entity', 'board-container'],
    })

    const board = Div({
      classList: ['entity', ...this.elementClassList],
      style: this.elementStyle()
    })
    outerDiv.append(board)

    return outerDiv
  }
}
