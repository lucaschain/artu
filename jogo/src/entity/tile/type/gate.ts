import { sleep } from '../../../utils'
import { Vector } from '../../../math/vector'
import { Tile } from '../tile'

export class Gate extends Tile {
  constructor(
    protected position: Vector,
    private orientation: string = "vertical"
  ) { super(position) }

  public open(): Promise<void> {
    this.root.classList.add("open")
    return sleep(100)
  }

  public close(): Promise<void> {
    this.root.classList.remove("open")
    return sleep(100)
  }

  protected elementStyle(): Record<string, string> {
    const amount = this.orientation === "vertical" ? 90 : 0;
    return {
      ...super.elementStyle(),
      transform: `rotate(${amount}deg)`
    }
  }

  protected get type(): string { return "gate" }
}
