import { Vector } from '../../math/vector'
import { Entity } from '../entity'

export class Tile extends Entity {
  protected size = 65

  constructor(protected position: Vector, protected _type: string) {
    super("tile")
  }

  protected get type(): string {
    return this._type
  }

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

  protected get additionalElementClassList() {
    return [`tile--${this.type}`]
  }
}
