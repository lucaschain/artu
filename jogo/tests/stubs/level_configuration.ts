import { LevelConfiguration } from 'src/core/level_configuration'
import { Tile } from 'src/core/tile'

export const CreateLevelConfiguration = (
  name = 'foo_dummy',
  label = 'Nivel básico de testes',
  tiles: Tile[] = [],
  width = 2,
  height = 2,
  availableInstructions: string[] = [],
  modal = ''
): LevelConfiguration => {
  return {
    name,
    label,
    tiles,
    width,
    height,
    availableInstructions,
    modal
  }
}
