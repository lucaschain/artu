import { AnimateElement, TransformRotate } from '../infra/motion'
import { Vector } from '../math/vector'
import { Base } from './base'

export class Hero extends Base {
  constructor(
    private position: Vector,
  ) { super() }

  public async rotateTo(degrees: number) {
    await TransformRotate(this.root, degrees, 200)
  }

  public async moveTo(position: Vector) {
    this.position = { ...position }

    await AnimateElement(this.root, this.elementStyle, 200)
  }

  protected get elementClassList() { return ['hero'] }

  protected get elementStyle() {
    return {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`
    }
  }
}
