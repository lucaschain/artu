import { Entity } from './entity'

export class Board extends Entity {
  constructor(
    private width: number,
    private height: number,
  ) { super() }

  protected get elementClassList() { return ['board'] }

  protected get elementStyle() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }
}
