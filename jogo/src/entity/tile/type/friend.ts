import { Vector } from '../../../math/vector'
import { Tile } from '../tile'

export class Friend extends Tile {
  constructor(
    protected position: Vector,
  ) { super(position, "friend") }

  public caught() {
    this.root.classList.add("caught")
  }

  public uncaught() {
    this.root.classList.remove("caught")
  }
}
