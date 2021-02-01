import { Tile } from '../tile';
import { BoardEvents } from '../../board';
import { GameInstance } from '../../game';
import FriendComponent from '../../../components/tile/type/friend';

export class Friend extends Tile {
  public onHeroEvent(eventName: string, _eventData: Record<string, string>) {
    if (eventName === BoardEvents.StepIn) {
      const game = GameInstance();
      game.increaseScore();
    }
  }

  public get component(): JSX.Element {
    return FriendComponent({
      position: this.position,
      size: this.size,
    });
  }
}
