import { Tile } from '../tile'
import { BoardEvents } from '../../board'
import { Entity } from '../../../entity'
import { Friend as FriendEntity } from '../../../entity/tile'
import { GameInstance }  from '../../game'

export class Friend extends Tile {
  protected createEntity(): Entity {
    return new FriendEntity(this.position)
  }

  public reset() {
    this.friendEntity.uncaught()
  }

  public onHeroEvent(eventName: string, _eventData: Record<string, string>) {
    if (eventName === BoardEvents.StepIn) {
      const game = GameInstance()
      game.increaseScore()

      this.friendEntity.caught()
    }
  }

  private get friendEntity(): FriendEntity {
    return this.entity as FriendEntity
  }
}
