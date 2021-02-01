import { Vector } from '../../math/vector';
import { Tile } from '../tile';
import { Ground } from '../tile/type';
import { MemoryShard } from '../memory';
import BoardComponent from '../../components/board';

export class Board {
  tileSize = 65;
  private tiles: Tile[];

  constructor(
    private columns: number,
    private rows: number,
    additionalTiles: Tile[],
  ) {
    this.tiles = additionalTiles;
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const tile = this.tileAtPosition({ x, y });

        if (!tile) {
          this.tiles.push(new Ground({ x, y }));
        }
      }
    }
  }

  public realPositionFor(tilePos: Vector): Vector {
    return RealPositionFor(tilePos, this.tileSize);
  }

  public isPositionWalkable(position: Vector): boolean {
    if (!this.isPositionWithinBounds(position)) {
      return false;
    }

    const tileInPosition = this.tileAtPosition(position);

    return tileInPosition ? tileInPosition.walkable : true;
  }

  public shardInPosition(position: Vector): MemoryShard | null {
    const tile = this.tileAtPosition(position);

    if (!tile) {
      return null;
    }

    return tile.shard;
  }

  public dispatchHeroEvent(
    eventName: string,
    eventParams: Record<string, string>,
    position: Vector,
  ) {
    const tile = this.tileAtPosition(position);

    tile && tile.onHeroEvent(eventName, eventParams, this);
  }

  public tileById(id: string): Tile | null {
    return this.tiles.filter(tile => tile.id === id)[0];
  }

  public reset() {
    this.tiles.forEach(tile => tile.reset());
  }

  public get component() {
    return BoardComponent({
      tiles: this.tiles,
      columns: this.columns,
      rows: this.rows,
      tileSize: this.tileSize,
    });
    //   <BoardComponent
    //     tiles={this.tiles}
    //     columns={this.columns}
    //     rows={this.rows}
    //     tileSize={this.tileSize}
    //   />
    // );
  }

  private isPositionWithinBounds(position: Vector): boolean {
    if (position.x < 0) return false;
    if (position.y < 0) return false;
    if (position.x >= this.columns) return false;
    if (position.y >= this.rows) return false;

    return true;
  }

  private tileAtPosition(pos: Vector): Tile {
    return this.tiles.filter(tile => {
      return tile.position.x === pos.x && tile.position.y === pos.y;
    })[0];
  }
}

export const RealPositionFor = (
  tilePos: Vector,
  tileSize: number,
  origin: Vector = { x: 0.5, y: 0.5 },
): Vector => {
  const xPos = tilePos.x * tileSize;
  const yPos = tilePos.y * tileSize;
  return {
    x: xPos + tileSize * origin.x,
    y: yPos + tileSize * origin.y,
  };
};
