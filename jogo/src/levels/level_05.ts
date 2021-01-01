import { LevelConfiguration } from '../core/level_configuration'
import { Friend, Goal } from '../core/tile/type'

export const Level05: LevelConfiguration = {
  name: 'level_04',
  availableInstructions: ['move', 'read', 'sum', 'subtract', 'say_memory'],
  width: 4,
  height: 1,
  tiles: [
    new Friend({x: 1, y: 0}),
    new Friend({x: 2, y: 0}),
    new Goal({x: 3, y: 0})
  ]
}
