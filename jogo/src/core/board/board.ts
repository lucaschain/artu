import { Vector } from '../../math/vector'
import { Tile } from '../tile'
import { Ground } from '../tile/type'
import { Board as BoardEntity } from '../../entity/board'
import { MemoryShard } from '../memory'

export class Board {
  tileSize = 65
  private entity: BoardEntity

  constructor(
    private columns: number,
    private rows: number,
    private tiles: Tile[],
  ) {
    this.createBoardEntity()
    this.createTiles()
  }

  public realPositionFor(tilePos: Vector): Vector {
    return RealPositionFor(
      tilePos,
      this.tileSize
    )
  }

  public isPositionWalkable(position: Vector): boolean {
    if (!this.isPositionWithinBounds(position)) {
      return false
    }

    const tileInPosition = this.tileAtPosition(position)

    return (tileInPosition) ? tileInPosition.walkable : true
  }

  public shardInPosition(position: Vector): MemoryShard {
    const tile = this.tileAtPosition(position)

    if (!tile) {
      return null
    }

    return tile.shard
  }

  public dispatchHeroEvent(
    eventName: string,
    eventParams: Record<string, string>,
    position: Vector
  ) {
    const tile = this.tileAtPosition(position)

    tile && tile.onHeroEvent(eventName, eventParams, this)
  }

  public destroy() {
    this.entity.destroy()
  }

  public tileById?(id: string): Tile {
    return this.tiles.filter(tile => tile.id === id)[0]
  }

  public reset() {
    this.tiles.forEach(tile => tile.reset())
  }

  private isPositionWithinBounds(position: Vector): boolean {
    if (position.x < 0) return false
    if (position.y < 0) return false
    if (position.x >= this.columns) return false
    if (position.y >= this.rows) return false

    return true
  }

  private createTiles(): void {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        let tile = (
          this.tileAtPosition({x, y}) || new Ground({ x, y })
        )
        tile.create()
      }
    }
  }

  private createBoardEntity(): void {
    this.entity = new BoardEntity(
      this.columns * this.tileSize,
      this.rows * this.tileSize,
    )
    this.entity.spawn()
  }

  private tileAtPosition?(pos: Vector): Tile {
    return this.tiles.filter(tile => {
      return tile.position.x === pos.x && tile.position.y === pos.y
    })[0]
  }
}

export const RealPositionFor = (
  tilePos: Vector,
  tileSize: number,
  origin: Vector = { x: 0.5, y: 0.5 },
): Vector => {
  const xPos = tilePos.x * tileSize
  const yPos = tilePos.y * tileSize
  return {
    x: xPos + tileSize * origin.x,
    y: yPos + tileSize * origin.y,
  }
}
