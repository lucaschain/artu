import { Vector } from '../../../math/vector'
import { Tile } from '../tile'

export type GateOrientation = "vertical" | "horizontal"

export class Gate extends Tile {
  constructor(
    protected position: Vector,
    private orientation: GateOrientation = "vertical"
  ) { super(position, "gate") }

  public open() {
    this.root.classList.add("open")
  }

  public close() {
    this.root.classList.remove("open")
  }

  protected elementStyle(): Record<string, string> {
    const amount = this.orientation === "vertical" ? 90 : 0;
    return {
      ...super.elementStyle(),
      transform: `rotate(${amount}deg)`
    }
  }
}
