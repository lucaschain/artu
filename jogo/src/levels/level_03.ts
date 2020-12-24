import { LevelConfiguration } from '../core/level_configuration'
import { Gate, Goal } from '../core/tile/type'

export const Level03: LevelConfiguration = {
  name: 'level_03',
  availableInstructions: ['move', 'turn_right'],
  width: 4,
  height: 1,
  tiles: [
    new Gate({x: 2, y: 0}),
    new Goal({x: 3, y: 0})
  ]
}
