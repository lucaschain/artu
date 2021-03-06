import { sleep } from '../utils'
import { Vector, VectorSum } from '../math/vector'
import { Direction, ToRadians } from '../math/rotation'
import { Board } from './board'
import { Hero as HeroEntity } from '../entity/hero'
import { BoardEvents } from './board'
import { SpeechBalloon } from '../entity/speech_balloon'
import { MemoryShard, Memory } from './memory'
import { Store } from '../infra/store'

export class Hero {
  private entity: HeroEntity
  private memory: Memory
  private direction: number
  private position: Vector

  constructor(
    private board: Board,
    private initialPosition: Vector,
    private initialDirection: Direction = Direction.EAST,
    memoryStore: Store<MemoryShard[]>,
  ) {
    this.position = this.initialPosition
    this.entity = new HeroEntity(
      this.realPosition
    )
    this.memory = new Memory(memoryStore)
    this.entity.spawn()
    this.rotateTo(this.initialDirection, 1)
  }

  public async sayYes() {
    await this.say("sim")
  }

  public async sayNo() {
    await this.say("não")
  }

  public async turnLeft(speed: number) {
    await this.rotate(-90, speed)
  }

  public async turnRight(speed: number) {
    await this.rotate(90, speed)
  }

  public async reset() {
    this.memory.reset()
    await Promise.all([
      this.rotateTo(this.initialDirection, 1),
      this.moveTo(this.initialPosition, 1)
    ])
  }

  public async moveForward(speed: number) {
    const dir = ToRadians(this.direction)
    const movement = {
      x: Math.round(Math.cos(dir)),
      y: Math.round(Math.sin(dir)),
    }

    await this.move(movement, speed)
    this.dispatchEventToBoard(BoardEvents.StepIn)
  }

  public async read() {
    const shard = this.board.shardInPosition(this.position)

    if (shard != null) {
      this.memory.push(shard)
      await this.say("...")
    } else {
      await this.say("?")
    }
  }

  public async sayMemory() {
    const shard = this.memory.pop()

    if (shard != null) {
      await this.say(shard.toString())
    } else {
      await this.say("?")
    }
  }

  public async sum() {
    const num = await this.readShardAsNumber()
    await this.sumMemory(num)
  }

  public async subtract() {
    const num = await this.readShardAsNumber()
    await this.sumMemory(-num)
  }

  private async readShardAsNumber?(): Promise<number> {
    const shard = this.board.shardInPosition(this.position)

    if (typeof shard !== "number") {
      await this.say("?")
      return 0
    }

    return shard
  }

  private async sumMemory(num: number) {
    const success = this.memory.sum(num)
    if (!success) {
      await this.say("?")
    } else {
      const numStr = num > 0 ? `+${num}` : num.toString()
      await this.say(numStr)
    }
  }

  private async say(message: string) {
    await sleep(180)
    new SpeechBalloon(this.realPosition, message, 3000, true).spawn()
    this.dispatchEventToBoard(BoardEvents.Say, { message })
  }

  private async rotate(direction: number, speed: number) {
    await this.rotateTo(this.direction + direction, speed)
  }

  private async rotateTo(direction: number, speed: number) {
    this.direction = direction
    await this.entity.rotateTo(this.direction, speed)
  }
  private async move(position: Vector, speed: number) {
    const moveTo = VectorSum(this.position, position)
    await this.moveTo(moveTo, speed)
  }

  private async moveTo(position: Vector, speed: number) {
    if (!this.board.isPositionWalkable(position)) {
      return this.entity.nudge(this.direction, speed)
    }

    this.position = {...position}

    await this.entity.moveTo(this.realPosition, speed)
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
