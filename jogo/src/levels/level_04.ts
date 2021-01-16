import { LevelConfiguration } from '../core/level_configuration'
import { Sign, SpeechListener, Gate, Goal } from '../core/tile/type'

export const Level04: LevelConfiguration = {
  name: 'level_04',
  label: 'Nível 4',
  availableInstructions: ['move', 'read', 'sum', 'subtract', 'say_memory'],
  width: 7,
  height: 1,
  tiles: [
    new Sign({x: 1, y: 0}, 1),
    new Sign({x: 2, y: 0}, 2),
    new Sign({x: 3, y: 0}, 5),
    new SpeechListener(
      {x: 4, y: 0},
      "1 + 2 - 5 dá quanto?",
      "-2",
      "gate-0",
    ),
    new Gate({x: 5, y: 0}, "gate-0"),
    new Goal({x: 6, y: 0})
  ]
}
