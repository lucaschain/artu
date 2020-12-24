import { Tile } from '../tile'

export class Block extends Tile {
  protected get type(): string { return "block" }
}
