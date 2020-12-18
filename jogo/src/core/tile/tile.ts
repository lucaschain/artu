import { Vector } from '../../math/vector'
import { Base } from '../../entities/base'

export abstract class BaseTile {
  constructor(
    protected size: number,
    public readonly position: Vector,
    protected parentElement?: HTMLElement
  ) {}

  create(parentElement?: HTMLElement): void {
    this.entity.spawn(parentElement)
  }

  protected abstract entity: Base
}
