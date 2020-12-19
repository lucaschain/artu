import { Vector } from '../../math/vector'
import { EntityConfiguration, Entity } from '../entity'

export abstract class BaseTile extends Entity {
  constructor(
    entityConfig: EntityConfiguration,
    protected size: number,
    protected position: Vector
  ) {
    super(entityConfig)
  }

  protected abstract get type(): string

  protected get elementStyle(): Record<string, string> {
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
