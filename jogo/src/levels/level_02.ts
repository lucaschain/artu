import { LevelConfiguration } from '../core/level_configuration'
import { Block, Goal } from '../core/tile/type'

export const Level02: LevelConfiguration = {
  name: 'level_02',
  label: 'Nível 2',
  availableInstructions: ['move', 'turn_right'],
  width: 3,
  height: 3,
  tiles: [
    new Block({x: 0, y: 1}),
    new Block({x: 1, y: 1}),
    new Goal({x: 0, y: 2})
  ]
}
