import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Block as BlockEntity } from '../../../entity/tile'

export class Block extends Tile {
  get walkable(): boolean {
    return false
  }

  protected get entity(): Entity {
    return new BlockEntity(this.position)
  }
}
