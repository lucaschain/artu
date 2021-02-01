import { Vector } from '../../../math/vector';
import { Tile } from '../tile';
import { Gate } from './gate';
import { Board, BoardEvents } from '../../board';
import SpeechListenerComponent from '../../../components/tile/type/speechListener';

export class SpeechListener extends Tile {
  constructor(
    public readonly position: Vector,
    private readonly question: string,
    private readonly answer: string,
    private readonly gateName: string,
  ) {
    super(position, '');
  }

  public onHeroEvent(
    eventName: string,
    { message }: Record<string, string>,
    board: Board,
  ) {
    if (eventName === BoardEvents.Say) {
      const gate = board.tileById(this.gateName);

      if (message === this.answer) {
        if (gate instanceof Gate) {
          gate.open();
        }
      }
    }
  }

  public get component(): JSX.Element {
    return SpeechListenerComponent({
      position: this.position,
      size: this.size,
    });
  }
}
