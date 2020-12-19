import { Vector } from '../../math/vector'
import { Tile } from '../tile'
import { Ground } from '../tile/type'
import { Entity } from '../../entity'
import { Board as BoardEntity } from '../../entity/board'

export class Board {
  tileSize = 48
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
    const origin = { x: 0.5, y: 0.5 }

    const xPos = tilePos.x * this.tileSize
    const yPos = tilePos.y * this.tileSize
    return {
      x: xPos + this.tileSize * origin.x,
      y: yPos + this.tileSize * origin.y,
    }
  }

  public append(entity: Entity) {
    entity.spawn(this.entity.root)
  }

  private createTiles(): void {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        let tile = (
          this.tileAtPosition({x, y}) || new Ground(this.tileSize, { x, y })
        )

        tile.create(this.entity.root)
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
