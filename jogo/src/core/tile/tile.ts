import { Vector } from '../../math/vector'
import { Entity } from '../../entity'

export abstract class Tile {
  constructor(
    public readonly position: Vector,
    public readonly id: string = "",
  ) {}

  public get walkable(): boolean {
    return true
  }

  public create(): void {
    this.entity.spawn()
  }

  public onHeroEvent(_eventName: string, _eventParams: Record<string, string>) {}

  public reset() {}

  protected abstract entity: Entity
}
