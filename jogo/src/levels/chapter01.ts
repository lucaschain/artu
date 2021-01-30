import { Block, Goal } from '../core/tile/type'
import { Direction } from '../math/rotation'
import { LevelConfiguration } from '../core/level_configuration'

export const Chapter01: LevelConfiguration[] = [
  {
    name: 'chapter_00_level_001',
    label: 'Olá, mundo!',
    availableInstructions: ['move', 'say_yes'],
    width: 3,
    height: 1,
    tiles: [
      new Goal({x: 2, y: 0})
    ]
  },
  {
    name: 'chapter_00_level_002',
    label: 'Primeiros Passos',
    availableInstructions: ['move'],
    width: 5,
    height: 1,
    tiles: [
      new Goal({x: 4, y: 0})
    ]
  },
  {
    name: 'chapter_00_level_003',
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
    name: 'chapter_00_level_004',
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
  {
    name: 'chapter_00_level_005',
    label: 'Espiral',
    availableInstructions: ['move', 'turn_left', 'turn_right'],
    width: 7,
    height: 7,
    tiles: [
      new Block({x: 0, y: 1}),
      new Block({x: 1, y: 1}),
      new Block({x: 2, y: 1}),
      new Block({x: 3, y: 1}),
      new Block({x: 4, y: 1}),
      new Block({x: 5, y: 1}),
      new Block({x: 5, y: 2}),
      new Block({x: 1, y: 3}),
      new Block({x: 2, y: 3}),
      new Block({x: 3, y: 3}),
      new Block({x: 5, y: 3}),
      new Block({x: 1, y: 4}),
      new Block({x: 5, y: 4}),
      new Goal({x: 2, y: 4}),
      new Block({x: 1, y: 5}),
      new Block({x: 2, y: 5}),
      new Block({x: 3, y: 5}),
      new Block({x: 5, y: 5}),
      new Block({x: 5, y: 5}),
    ]
  },
  {
    name: 'chapter_00_level_006',
    label: 'Labirinto',
    availableInstructions: ['move', 'turn_left', 'turn_right'],
    width: 9,
    height: 9,
    tiles: [
      new Block({x: 0, y: 1}),
      new Block({x: 1, y: 1}),
      new Block({x: 1, y: 3}),
      new Block({x: 1, y: 4}),
      new Block({x: 1, y: 5}),
      new Block({x: 1, y: 6}),
      new Block({x: 1, y: 7}),
      new Block({x: 2, y: 1}),
      new Block({x: 2, y: 3}),
      new Block({x: 2, y: 7}),
      new Block({x: 3, y: 1}),
      new Block({x: 3, y: 3}),
      new Block({x: 3, y: 5}),
      new Block({x: 3, y: 7}),
      new Block({x: 4, y: 1}),
      new Block({x: 4, y: 3}),
      new Block({x: 4, y: 5}),
      new Block({x: 4, y: 7}),
      new Block({x: 5, y: 1}),
      new Block({x: 5, y: 3}),
      new Block({x: 5, y: 4}),
      new Block({x: 5, y: 5}),
      new Block({x: 5, y: 7}),
      new Block({x: 6, y: 1}),
      new Block({x: 6, y: 7}),
      new Block({x: 7, y: 1}),
      new Block({x: 7, y: 2}),
      new Block({x: 7, y: 3}),
      new Block({x: 7, y: 4}),
      new Block({x: 7, y: 5}),
      new Block({x: 7, y: 6}),
      new Block({x: 7, y: 7}),
    ]
  }
]