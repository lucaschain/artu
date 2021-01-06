import { Tile } from '../tile'
import { BoardEvents } from '../../board'
import { Entity } from '../../../entity'
import { Tile as GoalEntity } from '../../../entity/tile'
import { GameInstance }  from '../../game'

export class Goal extends Tile {
  protected createEntity(): Entity {
    return new GoalEntity(this.position, "goal")
  }

  public onHeroEvent(eventName: string, _eventData: Record<string, string>) {
    if (eventName === BoardEvents.StepIn) {
      const game = GameInstance()
      game.toNextLevel()
    }
  }
}
