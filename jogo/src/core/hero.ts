import { sleep } from '../utils'
import { Vector, VectorSum } from '../math/vector'
import { ToRadians } from '../math/rotation'
import { Board } from './board'
import { Hero as HeroEntity } from '../entity/hero'
import { BoardEvents } from './board'
import { SpeechBalloon } from '../entity/speech_balloon'

export class Hero {
  private entity: HeroEntity
  private direction: number = 0

  constructor(private board: Board, private position: Vector) {
    this.entity = new HeroEntity(
      this.realPosition
    )

    this.entity.spawn()
  }

  public async sayYes() {
    await sleep(200)
    this.say("Sim")
  }

  private say(message: string) {
    new SpeechBalloon(this.realPosition, message).spawn()
    this.dispatchEventToBoard(BoardEvents.Say, { message })
  }

  public async turnLeft() {
    await this.rotate(-90)
  }

  public async turnRight() {
    await this.rotate(90)
  }

  public async reset() {
    await Promise.all([
      this.rotateTo(0),
      this.moveTo({x: 0, y: 0})
    ])
  }

  public async moveForward() {
    const dir = ToRadians(this.direction)
    const movement = {
      x: Math.round(Math.cos(dir)),
      y: Math.round(Math.sin(dir)),
    }

    await this.move(movement)
    this.dispatchEventToBoard(BoardEvents.StepIn)
  }

  private async rotate(direction: number) {
    await this.rotateTo(this.direction + direction)
  }

  private async rotateTo(direction: number) {
    this.direction = direction
    await this.entity.rotateTo(this.direction)
  }
  private async move(position: Vector) {
    const moveTo = VectorSum(this.position, position)
    await this.moveTo(moveTo)
  }

  private async moveTo(position: Vector) {
    if (!this.board.isPositionWalkable(position)) {
      return this.entity.nudge(this.direction)
    }

    this.position = {...position}

    await this.entity.moveTo(this.realPosition)
  }

  private get realPosition() {
    return this.board.realPositionFor(this.position)
  }

  private dispatchEventToBoard(
    eventName: string,
    eventParams: Record<string, string> = {},
  ) {
    this.board.dispatchHeroEvent(eventName, eventParams, this.position)
  }
}
