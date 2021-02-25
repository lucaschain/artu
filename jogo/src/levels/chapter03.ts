import { Sign, Block, Gate, SpeechListener, Goal } from '../core/tile/type'
import { Direction } from '../math/rotation'
import { LevelConfiguration } from '../core/level_configuration'

export const Chapter03: LevelConfiguration[] = [
  {
    name: 'chapter_03_level_001',
    label: 'Invasão hacker',
    availableInstructions: ['move', 'turn_right', 'turn_left', 'read', 'say_memory'],
    startPosition: { x: 4, y: 0 },
    startDirection: Direction.SOUTH,
    width: 5,
    height: 6,
    tiles: [
      new Block({x: 0, y: 0}),
      new Block({x: 0, y: 4}),
      new Goal({x: 0, y: 5}),
      new Block({x: 1, y: 0}),
      new Sign({x: 1, y: 2}, 'senha_secreta'),
      new Block({x: 1, y: 4}),
      new Block({x: 2, y: 0}),
      new Block({x: 2, y: 4}),
      new Gate({x: 2, y: 5}, 'gate-1'),
      new Block({x: 3, y: 0}),
      new Block({x: 3, y: 1}),
      new Block({x: 3, y: 3}),
      new Block({x: 3, y: 4}),
      new SpeechListener({x: 3, y: 5}, 'Qual é a senha?', 'senha_secreta', 'gate-1'),
    ]
  }
]
