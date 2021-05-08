import { Tile } from '../tile'
import { Vector } from '../../../math/vector'
import { Gate as GateEntity, GateOrientation } from '../../../entity/tile'

export class Gate extends Tile {
  private isOpen = false

  constructor(
    position: Vector,
    id = '',
    private orientation: GateOrientation = 'vertical'
  ) {
    super(position, id)
  }

  public async open() {
    this.isOpen = true
    this.gateEntity.open()
  }

  public async close() {
    this.isOpen = false
    this.gateEntity.close()
  }

  public reset() {
    this.close()
  }

  public get walkable(): boolean {
    return this.isOpen
  }

  protected createEntity(): GateEntity {
    return new GateEntity(this.position, this.orientation)
  }

  private get gateEntity(): GateEntity {
    return this.entity as GateEntity
  }
}
