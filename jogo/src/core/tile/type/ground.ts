import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Tile as GroundEntity } from '../../../entity/tile'

export class Ground extends Tile {
  protected createEntity(): Entity {
    return new GroundEntity(this.position, "tile")
  }
}
