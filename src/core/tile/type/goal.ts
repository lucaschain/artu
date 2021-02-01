import { Tile } from '../tile';
import { BoardEvents } from '../../board';
import { GameInstance } from '../../game';
import GoalComponent from '../../../components/tile/type/goal';

export class Goal extends Tile {
  public onHeroEvent(eventName: string, _eventData: Record<string, string>) {
    if (eventName === BoardEvents.StepIn) {
      const game = GameInstance();
      game.toNextLevel();
    }
  }

  public get component(): JSX.Element {
    return GoalComponent({
      position: this.position,
      size: this.size,
    });
  }
}
