import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Gate as GateEntity } from '../../../entity/tile'

export class Gate extends Tile {
  private isOpen = false

  public open() {
    this.isOpen = true
  }

  public close() {
    this.isOpen = false
  }

  public reset() {
    this.close()
  }

  public get walkable(): boolean {
    return this.isOpen
  }

  protected get entity(): Entity {
    return new GateEntity(this.position)
  }
}
