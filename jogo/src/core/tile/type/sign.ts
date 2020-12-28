import { Vector } from '../../../math/vector'
import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Sign as SignEntity } from '../../../entity/tile'
import { MemoryShard } from '../../memory'

export class Sign extends Tile {
  constructor(
    public readonly position: Vector,
    private readonly content: MemoryShard,
  ) {
    super(position, "")
  }

  public get shard(): MemoryShard {
    return this.content
  }

  protected createEntity(): Entity {
    return new SignEntity(this.position)
  }


}
