import { Tile } from './tile'

export type LevelConfiguration = {
  name: string,
  label: string,
  tiles: Tile[],
  width: number,
  height: number,
  availableInstructions: string[],
}
