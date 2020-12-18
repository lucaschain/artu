import { Vector } from '../math/vector'
import { Board } from './board'
import { Hero as HeroEntity } from '../entities/hero'

export enum Direction {
  Right = 0,
  Down = 1,
  Left = 2,
  Up = 3,
}

export class Hero {
  private entity: HeroEntity
  private direction = Direction.Right

  constructor(private board: Board, private position: Vector) {
    this.entity = new HeroEntity(
      this.realPosition
    )

    this.board.append(this.entity)
  }

  public async rotateTo(direction: Direction) {
    await this.entity.rotateTo(direction * 90)
  }

  public async moveTo(position: Vector) {
    this.position = { ...position }

    await this.entity.moveTo(this.realPosition)
  }

  private get realPosition() {
    return this.board.realPositionFor(this.position)
  }
}
