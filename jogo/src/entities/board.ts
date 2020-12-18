import { Base } from './base'

export class Board extends Base {
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
