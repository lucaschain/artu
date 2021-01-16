import { LevelConfiguration } from '../core/level_configuration'
import { SpeechListener, Gate, Goal } from '../core/tile/type'

export const Level03: LevelConfiguration = {
  name: 'level_03',
  label: 'Nível 3',
  availableInstructions: ['move', 'say_yes'],
  width: 4,
  height: 1,
  tiles: [
    new SpeechListener(
      {x: 1, y: 0},
      "Você é um humano?",
      "sim",
      "gate-0",
    ),
    new Gate({x: 2, y: 0}, "gate-0"),
    new Goal({x: 3, y: 0})
  ]
}
