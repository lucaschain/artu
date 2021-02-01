import { Tile } from '../tile';
import GroundComponent from '../../../components/tile/type/ground';

export class Ground extends Tile {
  public get component(): JSX.Element {
    return GroundComponent({
      position: this.position,
      size: this.size,
    });
  }
}
