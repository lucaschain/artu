import { Vector } from '../math/vector'
import { Direction } from '../math/rotation'
import { Tile } from './tile'

export type LevelConfiguration = {
  name: string,
  label: string,
  tiles: Tile[],
  width: number,
  height: number,
  availableInstructions: string[],
  startPosition?: Vector,
  startDirection?: Direction,
}
