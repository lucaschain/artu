import { BaseTile } from '../base'

export class Ground extends BaseTile {

  get walkable(): boolean { return true }

  protected get type(): string { return "ground" }
}
