import { Tile } from '../tile'
import { Gate as GateEntity } from '../../../entity/tile'

export class Gate extends Tile {
  private isOpen = false

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
    return new GateEntity(this.position)
  }

  private get gateEntity(): GateEntity {
    return this.entity as GateEntity
  }
}
