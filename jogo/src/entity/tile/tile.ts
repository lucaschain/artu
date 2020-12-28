import { Vector } from '../../math/vector'
import { Entity } from '../entity'

export abstract class Tile extends Entity {
  protected size = 65

  constructor(protected position: Vector) {
    super()
  }

  protected abstract get type(): string

  protected get parentElement(): HTMLElement {
    return document.querySelector('.board')
  }

  protected elementStyle(): Record<string, string> {
    const left = this.position.x * this.size
    const top = this.position.y * this.size

    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      left: `${left}px`,
      top: `${top}px`,
    }
  }

  protected get elementClassList() {
    return ["tile", `tile--${this.type}`]
  }
}
