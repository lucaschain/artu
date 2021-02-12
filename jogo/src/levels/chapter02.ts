import { Block, Gate, SpeechListener, Goal } from '../core/tile/type'
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
  }
]
