import { CustomAnimation, AnimateElement, TransformRotate } from '../infra/motion'
import { Vector } from '../math/vector'
import { Entity } from './entity'

export class Hero extends Entity {
  constructor(
    private position: Vector,
  ) { super("hero") }

  public rotateTo(degrees: number, speed = 1): Promise<void> {
    return TransformRotate(this.root, degrees, 200 / speed)
  }

  public moveTo(position: Vector, speed = 1): Promise<void> {
    this.position = { ...position }

    return AnimateElement(this.root, this.elementStyle(), 230 / speed)
  }

  public nudge(direction: number, speed = 1): Promise<void> {
    const modDirection = (direction % 360).toString()
    return CustomAnimation(this.root, `hero-nudge-${modDirection}`, 200 / speed)
  }

  protected get elementClassList() { return ['hero'] }

  protected elementStyle() {
    return {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`
    }
  }

  protected get parentElement(): HTMLElement {
    return document.querySelector('.board') as HTMLElement
  }
}
