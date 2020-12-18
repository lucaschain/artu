import { BaseTile } from '../tile'
import { Base as BaseEntity } from '../../../entities/base'
import { Ground as GroundEntity } from '../../../entities/tiles'

export class Ground extends BaseTile {
  protected get entity(): BaseEntity {
    return new GroundEntity({}, this.size, this.position)
  }
}
