import { Tile } from '../tile'

export class Ground extends Tile {
  protected get type(): string { return "ground" }
}
