import { AnimateElement, TransformRotate } from '../infra/motion'
import { Vector } from '../math/vector'
import { Entity } from './entity'

export class Hero extends Entity {
  constructor(
    private position: Vector,
  ) { super() }

  public async rotateTo(degrees: number) {
    await TransformRotate(this.root, degrees, 230)
  }

  public async moveTo(position: Vector) {
    this.position = { ...position }

    await AnimateElement(this.root, this.elementStyle, 230)
  }

  protected get elementClassList() { return ['hero'] }

  protected get elementStyle() {
    return {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`
    }
  }
}
