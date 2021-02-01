import { Vector } from '../../../math/vector';
import { Tile } from '../tile';
import { MemoryShard } from '../../memory';
import SignComponent from '../../../components/tile/type/sign';

export class Sign extends Tile {
  constructor(
    public readonly position: Vector,
    private readonly content: MemoryShard,
  ) {
    super(position, '');
  }

  public get shard(): MemoryShard {
    return this.content;
  }

  public get component(): JSX.Element {
    return SignComponent({
      position: this.position,
      size: this.size,
    });
  }
}
