import { Vector, VectorSum } from '../math/vector'
import { ToRadians } from '../math/rotation'
import { Board } from './board'
import { Hero as HeroEntity } from '../entities/hero'

export class Hero {
  private entity: HeroEntity
  private direction: number = 0

  constructor(private board: Board, private position: Vector) {
    this.entity = new HeroEntity(
      this.realPosition
    )

    this.board.append(this.entity)
  }

  public async turnLeft() {
    await this.rotate(-90)
  }

  public async turnRight() {
    await this.rotate(90)
  }

  public async reset() {
    this.rotateTo(0)
    await this.moveTo({x: 0, y: 0})
  }

  public async moveForward() {
    const dir = ToRadians(this.direction)
    const movement = {
      x: Math.round(Math.cos(dir)),
      y: Math.round(Math.sin(dir)),
    }

    await this.move(movement)
  }

  private async rotate(direction: number) {
    await this.entity.rotateTo(this.direction + direction)
  }

  private async rotateTo(direction: number) {
    this.direction = direction
    await this.entity.rotateTo(this.direction)
  }
  private async move(position: Vector) {
    await this.moveTo(VectorSum(this.position, position))
  }

  private async moveTo(position: Vector) {
    this.position = {...position}

    await this.entity.moveTo(this.realPosition)
  }

  private get realPosition() {
    return this.board.realPositionFor(this.position)
  }
}
