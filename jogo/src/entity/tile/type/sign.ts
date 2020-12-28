import { Tile } from '../tile'

export class Sign extends Tile {
  protected get type(): string { return "sign" }
}
