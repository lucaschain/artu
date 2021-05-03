import { Sign, Block, Gate, SpeechListener, Goal } from '../core/tile/type'
import { Direction } from '../math/rotation'
import { LevelConfiguration } from '../core/level_configuration'

export const Chapter04: LevelConfiguration[] = [
 {
    name: 'chapter_04_level_001',
    label: 'Soma',
    availableInstructions: ['move', 'turn_right', 'turn_left', 'read', 'say_memory', 'sum'],
    width: 4,
    height: 4,
    tiles: [
      new Block({x: 0, y: 2}),
      new Goal({x: 0, y: 3}),
      new Sign({x: 1, y: 0}, 2),
      new Block({x: 1, y: 2}),
      new Sign({x: 2, y: 0}, 3),
      new Block({x: 2, y: 2}),
      new SpeechListener({x: 3, y: 1}, 'Quanto é 2 + 3?', '5', 'gate-1'),
      new Gate({x: 3, y: 2}, 'gate-1', 'horizontal'),
    ]
  }
]
