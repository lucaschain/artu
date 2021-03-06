import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Tile as BlockEntity } from '../../../entity/tile'

export class Block extends Tile {
  get walkable(): boolean {
    return false
  }

  protected createEntity(): Entity {
    return new BlockEntity(this.position, "block")
  }
}
