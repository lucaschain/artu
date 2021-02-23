import { Block, Gate, SpeechListener, Goal } from '../core/tile/type'
import { Direction } from '../math/rotation'
import { LevelConfiguration } from '../core/level_configuration'

export const Chapter02: LevelConfiguration[] = [
  {
    name: 'chapter_02_level_001',
    label: 'Abre-te, sésamo',
    availableInstructions: ['move', 'say_yes'],
    width: 4,
    height: 1,
    tiles: [
      new SpeechListener(
        {x: 1, y: 0},
        "Você quer passar?",
        "sim",
        "gate-0",
      ),
      new Gate({x: 2, y: 0}, "gate-0"),
      new Goal({x: 3, y: 0})
    ]
  },
  {
    name: 'chapter_02_level_002',
    label: 'Teste de humanidade',
    availableInstructions: ['move', 'say_yes', 'say_no', 'turn_right', 'turn_left'],
    width: 4,
    height: 4,
    tiles: [
      new Block({x: 1, y: 2}),
      new Gate({x: 1, y: 3}, 'gate-2'),
      new Block({x: 2, y: 2}),
      new Gate({x: 2, y: 3}, 'gate-1'),
      new SpeechListener({x: 3, y: 0}, 'É bom colaborar com os amigos?', 'sim', 'gate-1'),
      new SpeechListener({x: 3, y: 1}, 'Podemos maltratar os animais?', 'não', 'gate-2'),
      new Block({x: 3, y: 2}),
      new Goal({x: 3, y: 3}),
    ]
  },
  {
    name: 'chapter_02_level_003',
    label: 'Dependências',
    availableInstructions: [
      'move', 'say_yes', 'say_no', 'turn_right', 'turn_left'
    ],
    width: 6,
    height: 5,
    startPosition: { x: 5, y: 2 },
    startDirection: Direction.WEST,
    tiles: [
      new SpeechListener({x: 0, y: 0}, 'responda sim', 'sim', 'gate-1'),
      new Block({x: 0, y: 1}),
      new Goal({x: 0, y: 2}),
      new Gate({x: 0, y: 3}, 'gate-2', 'horizontal'),
      new Block({x: 1, y: 1}),
      new Block({x: 1, y: 2}),
      new Block({x: 1, y: 3}),
      new Block({x: 2, y: 1}),
      new SpeechListener({x: 2, y: 2}, 'responda nao', 'não', 'gate-2'),
      new Block({x: 2, y: 3}),
      new Block({x: 3, y: 1}),
      new Gate({x: 3, y: 2}, 'gate-1'),
      new Block({x: 3, y: 3},),
      new Block({x: 4, y: 1}),
      new Block({x: 4, y: 3}),
    ]
  },
  {
    name: 'chapter_02_level_004',
    label: 'Mais',
    availableInstructions: [
      'move', 'say_yes', 'say_no', 'turn_right', 'turn_left'
    ],
    width: 7,
    height: 7,
    startPosition: { x: 3, y: 3 },
    startDirection: Direction.SOUTH,
    tiles: [
      new Block({x: 0, y: 0}),
      new Block({x: 0, y: 1}),
      new Block({x: 0, y: 2}),
      new SpeechListener({x: 0, y: 3}, 'Maçã é fruta?', 'sim', 'gate-1'),
      new Block({x: 0, y: 4}),
      new Block({x: 0, y: 5}),
      new Block({x: 0, y: 6}),
      new Block({x: 1, y: 0}),
      new Block({x: 1, y: 1}),
      new Block({x: 1, y: 2}),
      new Block({x: 1, y: 4}),
      new Block({x: 1, y: 5}),
      new Block({x: 1, y: 6}),
      new Block({x: 2, y: 0}),
      new Block({x: 2, y: 1}),
      new Block({x: 2, y: 2}),
      new Block({x: 2, y: 4}),
      new Block({x: 2, y: 5}),
      new Block({x: 2, y: 6}),
      new SpeechListener({x: 3, y: 0}, 'Ainda existem dinossauros?', 'não', 'gate-2'),
      new Gate({x: 3, y: 4}, 'gate-1', 'horizontal'),
      new Gate({x: 3, y: 5}, 'gate-2', 'horizontal'),
      new Gate({x: 3, y: 6}, 'gate-3', 'horizontal'),
      new Block({x: 4, y: 0}),
      new Block({x: 4, y: 1}),
      new Block({x: 4, y: 2}),
      new Block({x: 4, y: 4}),
      new Block({x: 4, y: 5}),
      new Goal({x: 4, y: 6}),
      new Block({x: 5, y: 0}),
      new Block({x: 5, y: 1}),
      new Block({x: 5, y: 2}),
      new Block({x: 5, y: 4}),
      new Block({x: 5, y: 5}),
      new Block({x: 5, y: 6}),
      new Block({x: 6, y: 0}),
      new Block({x: 6, y: 1}),
      new Block({x: 6, y: 2}),
      new SpeechListener({x: 6, y: 3}, 'Peixes sabem voar?', 'não', 'gate-3'),
      new Block({x: 6, y: 4}),
      new Block({x: 6, y: 5}),
      new Block({x: 6, y: 6}),
    ]
  }
]
