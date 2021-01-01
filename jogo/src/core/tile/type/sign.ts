import { Vector } from '../../../math/vector'
import { Tile } from '../tile'
import { Entity } from '../../../entity'
import { Tile as SignEntity } from '../../../entity/tile'
import { MemoryShard } from '../../memory'
import { SpeechBalloon } from '../../../entity/speech_balloon'

export class Sign extends Tile {
  constructor(
    public readonly position: Vector,
    private readonly content: MemoryShard,
  ) {
    super(position, "")
  }

  create(): void {
    super.create()

    new SpeechBalloon(
      this.realPosition,
      this.shard.toString(),
      0
    ).spawn()
  }

  public get shard(): MemoryShard {
    return this.content
  }

  protected createEntity(): Entity {
    return new SignEntity(this.position, "sign")
  }
}
