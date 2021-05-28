import { Block, Goal } from '../core/tile/type'
import { Direction } from '../math/rotation'
import { LevelConfiguration } from '../core/level_configuration'

export const Chapter01: LevelConfiguration[] = [
  {
    name: 'chapter_01_level_001',
    label: 'Olá, mundo!',
    availableInstructions: ['move'],
    width: 3,
    height: 1,
    tiles: [
      new Goal({x: 2, y: 0})
    ]
  },
  {
    name: 'chapter_01_level_002',
    label: 'Primeiros Passos',
    availableInstructions: ['move'],
    width: 5,
    height: 1,
    tiles: [
      new Goal({x: 4, y: 0})
    ]
  },
  {
    name: 'chapter_01_level_003',
    label: 'O que tem pra esquerda?',
    availableInstructions: ['move', 'turn_left'],
    width: 3,
    height: 3,
    startDirection: Direction.SOUTH,
    tiles: [
      new Block({x: 1, y: 0}),
      new Block({x: 1, y: 1}),
      new Goal({x: 2, y: 0})
    ]
  },
  {
    name: 'chapter_01_level_004',
    label: 'S de sapato',
    availableInstructions: ['move', 'turn_left', 'turn_right'],
    width: 3,
    height: 5,
    startPosition: {x: 2, y: 0},
    startDirection: Direction.WEST,
    tiles: [
      new Block({x: 1, y: 1}),
      new Block({x: 2, y: 1}),
      new Block({x: 0, y: 3}),
      new Block({x: 1, y: 3}),
      new Goal({x: 0, y: 4})
    ]
  },
]
