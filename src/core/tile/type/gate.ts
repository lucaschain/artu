import { Tile } from '../tile';
import GateComponent from '../../../components/tile/type/gate';

export class Gate extends Tile {
  private isOpen = false;

  public async open() {
    this.isOpen = true;
  }

  public async close() {
    this.isOpen = false;
  }

  public reset() {
    this.close();
  }

  public get walkable(): boolean {
    return this.isOpen;
  }

  public get component(): JSX.Element {
    return GateComponent({
      position: this.position,
      size: this.size,
    });
  }
}
