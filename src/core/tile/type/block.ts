import { Tile } from '../tile';
import BlockComponent from '../../../components/tile/type/block';

export class Block extends Tile {
  get walkable(): boolean {
    return false;
  }

  public get component(): JSX.Element {
    return BlockComponent({
      position: this.position,
      size: this.size,
    });
  }
}
