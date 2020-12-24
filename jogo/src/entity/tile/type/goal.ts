import { Tile } from '../tile'

export class Goal extends Tile {
  protected get type(): string { return "goal" }
}
