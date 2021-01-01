import { Vector } from '../../../math/vector'
import { Tile } from '../tile'
import { Gate } from './gate'
import { Board, BoardEvents } from '../../board'
import { Entity } from '../../../entity'
import { SpeechBalloon } from '../../../entity/speech_balloon'
import { Tile as SpeechListenerEntity } from '../../../entity/tile'

export class SpeechListener extends Tile {
  constructor(
    public readonly position: Vector,
    private readonly question: string,
    private readonly answer: string,
    private readonly gateName: string,
  ) {
    super(position, "")
  }

  create(): void {
    super.create()

    new SpeechBalloon(
      this.realPosition,
      this.question,
      0
    ).spawn()
  }

  protected createEntity(): Entity {
    return new SpeechListenerEntity(this.position, "speech-listener")
  }

  public onHeroEvent(
    eventName: string,
    { message }: Record<string, string>,
    board: Board,
  ) {
    if (eventName === BoardEvents.Say) {
      const gate = board.tileById(this.gateName)

      if (message === this.answer) {
        if (gate instanceof Gate) {
          gate.open()
        }
      }
    }
  }
}
