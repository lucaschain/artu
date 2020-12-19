import { Vector } from '../../math/vector'
import { Entity } from '../../entity'

export abstract class Tile {
  constructor(
    protected size: number,
    public readonly position: Vector,
    protected parentElement?: HTMLElement
  ) {}

  create(parentElement?: HTMLElement): void {
    this.entity.spawn(parentElement)
  }

  protected abstract entity: Entity
}
