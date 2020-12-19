import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Ground as GroundEntity } from '../../../entity/tile'

export class Ground extends Tile {
  protected get entity(): Entity {
    return new GroundEntity({}, this.size, this.position)
  }
}
