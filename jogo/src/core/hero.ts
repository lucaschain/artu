import { Vector } from '../math/vector'
import { Board } from './board'
import { Hero as HeroEntity } from '../entities/hero'

export class Hero {
  private entity: HeroEntity

  constructor(private board: Board, private position: Vector) {
    this.entity = new HeroEntity(
      this.realPosition
    )

    this.board.append(this.entity)
  }

  public async moveTo(position: Vector) {
    this.position = { ...position }

    await this.entity.moveTo(this.realPosition)
  }

  private get realPosition() {
    return this.board.realPositionFor(this.position)
  }
}
