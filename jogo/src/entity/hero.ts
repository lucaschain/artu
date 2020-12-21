import { CustomAnimation, AnimateElement, TransformRotate } from '../infra/motion'
import { Vector } from '../math/vector'
import { Entity } from './entity'

export class Hero extends Entity {
  constructor(
    private position: Vector,
  ) { super() }

  public rotateTo(degrees: number): Promise<void> {
    return TransformRotate(this.root, degrees, 230)
  }

  public moveTo(position: Vector): Promise<void> {
    this.position = { ...position }

    return AnimateElement(this.root, this.elementStyle, 230)
  }

  public nudge(): Promise<void> {
    return CustomAnimation(this.root, 'hero-nudge', 200)
  }

  protected get elementClassList() { return ['hero'] }

  protected get elementStyle() {
    return {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`
    }
  }
}
