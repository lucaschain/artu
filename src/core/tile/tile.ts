import { Vector } from '../../math/vector';
import { Board, RealPositionFor } from '../board';
import { MemoryShard } from '../memory';

export abstract class Tile {
  protected size = 65;
  constructor(
    public readonly position: Vector,
    public readonly id: string = '',
  ) {}

  public get walkable(): boolean {
    return true;
  }

  public onHeroEvent(
    _eventName: string,
    _eventParams: Record<string, string>,
    _board: Board,
  ) {}

  public get shard(): MemoryShard | null {
    return null;
  }

  public reset() {}

  protected get realPosition(): Vector {
    return RealPositionFor(this.position, 65);
  }

  public abstract get component(): JSX.Element;
}
