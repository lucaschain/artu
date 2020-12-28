import { Vector } from '../../math/vector'
import { Entity } from '../../entity'
import { Board, RealPositionFor } from '../board'
import { MemoryShard } from '../memory'

export abstract class Tile {
  private _entity: Entity

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

  public onHeroEvent(
    _eventName: string,
    _eventParams: Record<string, string>,
    _board: Board,
  ) {}

  public get shard(): MemoryShard {
    return null
  }

  public reset() {}

  protected get entity(): Entity {
    if (!this._entity) {
      this._entity = this.createEntity()
    }

    return this._entity
  }

  protected abstract createEntity(): Entity

  protected get realPosition(): Vector {
    return RealPositionFor(this.position, 65)
  }
}
