import { Tile } from '../tile'
import { BoardEvents } from '../../board'
import { Entity } from '../../../entity'
import { Tile as GoalEntity } from '../../../entity/tile'
import { GameInstance }  from '../../game'

export class Goal extends Tile {
  used = false
  protected createEntity(): Entity {
    return new GoalEntity(this.position, "goal")
  }

  public onHeroEvent(eventName: string, _eventData: Record<string, string>) {
    if (this.used) return
    if (eventName === BoardEvents.StepIn) {
      this.used = true
      const game = GameInstance()
      game.toNextLevel()
    }
  }
}
