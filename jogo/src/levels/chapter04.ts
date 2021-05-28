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
  },
  {
    name: 'chapter_04_level_002',
    label: 'Subtrai?',
    availableInstructions: ['move', 'turn_right', 'turn_left', 'read', 'say_memory', 'subtract'],
    width: 5,
    height: 3,
    startPosition: { x: 2, y: 2, },
    startDirection: Direction.NORTH,
    tiles: [
      new Block({x: 0, y: 0}),
      new Block({x: 0, y: 1}),
      new Sign({x: 0, y: 2}, 6),
      new Block({x: 1, y: 0}),
      new Block({x: 1, y: 1}),
      new Goal({x: 2, y: 0}),
      new Gate({x: 2, y: 1}, 'gate-1', 'horizontal'),
      new SpeechListener({x: 2, y: 2}, '6 - 2?', '4', 'gate-1'),
      new Block({x: 3, y: 0}),
      new Block({x: 3, y: 1}),
      new Block({x: 4, y: 0}),
      new Block({x: 4, y: 1}),
      new Sign({x: 4, y: 2}, 2),
    ]
  },
  {
    name: 'chapter_04_level_003',
    label: 'Repita',
    availableInstructions: ['move', 'read', 'say_memory', 'sum'],
    width: 5,
    height: 1,
    startPosition: { x: 0, y: 0 },
    startDirection: Direction.EAST,
    tiles: [
      new Sign({x: 1, y: 0}, 1),
      new SpeechListener({x: 2, y: 0}, '1+1+1?', '3', 'gate-1'),
      new Gate({x: 3, y: 0}, 'gate-1'),
      new Goal({x: 4, y: 0}),
    ]
  },
  {
    name: 'chapter_04_level_004',
    label: 'Final',
    availableInstructions: ['move', 'turn_left', 'turn_right', 'read', 'say_memory', 'subtract'],
    width: 5,
    height: 2,
    startPosition: { x: 3, y: 1 },
    startDirection: Direction.NORTH,
    tiles: [
      new Goal({x: 0, y: 0}),
      new Block({x: 0, y: 1}),
      new Gate({x: 1, y: 0}, 'gate-1'),
      new Block({x: 1, y: 1}),
      new SpeechListener({x: 2, y: 0}, '60-3?', '57', 'gate-1'),
      new Block({x: 2, y: 1}),
      new Sign({x: 4, y: 0}, 60),
      new Sign({x: 4, y: 1}, 1),
    ]
  }
]
