import { sleep } from '../utils'
import { Vector, VectorSum } from '../math/vector'
import { ToRadians } from '../math/rotation'
import { Board } from './board'
import { Hero as HeroEntity } from '../entity/hero'
import { BoardEvents } from './board'
import { SpeechBalloon } from '../entity/speech_balloon'
import { MemoryShard, Memory } from './memory'
import { Store } from '../infra/store'

export class Hero {
  private entity: HeroEntity
  private direction: number = 0
  private memory: Memory

  constructor(
    private board: Board,
    private position: Vector,
    memoryStore: Store<MemoryShard[]>,
  ) {
    this.entity = new HeroEntity(
      this.realPosition
    )
    this.memory = new Memory(memoryStore)
    this.entity.spawn()
  }

  public async sayYes() {
    await sleep(200)
    this.say("sim")
  }

  public async sayNo() {
    await sleep(200)
    this.say("não")
  }

  public async turnLeft() {
    await this.rotate(-90)
  }

  public async turnRight() {
    await this.rotate(90)
  }

  public async reset() {
    this.memory.reset()
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

  public async read() {
    const shard = this.board.shardInPosition(this.position)

    await sleep(200)
    if (shard != null) {
      this.memory.push(shard)
      this.say("...")
    } else {
      this.say("?")
    }
  }

  public async sayMemory() {
    const shard = this.memory.pop()

    if (shard != null) {
      this.say(shard.toString())
    } else {
      this.say("?")
    }
  }

  public async sum() {
    const num = this.readShardAsNumber()
    await this.sumMemory(num)
  }

  public async subtract() {
    const num = this.readShardAsNumber()
    await this.sumMemory(-num)
  }

  private readShardAsNumber?(): number {
    const shard = this.board.shardInPosition(this.position)

    if (typeof shard !== "number") {
      this.say("?")
      return
    }

    return shard
  }

  private async sumMemory(num: number) {
    const success = this.memory.sum(num)
    if (!success) {
      this.say("?")
    } else {
      const numStr = num > 0 ? `+${num}` : num.toString()
      this.say(numStr)
    }
  }

  private say(message: string) {
    new SpeechBalloon(this.realPosition, message).spawn()
    this.dispatchEventToBoard(BoardEvents.Say, { message })
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
