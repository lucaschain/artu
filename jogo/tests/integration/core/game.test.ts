import { Store } from '../../../src/infra/store'
import { Game } from '../../../src/core/game'
import { Instruction } from '../../../src/core/instruction'
import { MemoryShard } from '../../../src/core/memory'
import { CreateLevelConfiguration } from '../../stubs/level_configuration'

describe('Integration | Core | Game', () => {
  describe('Ao carregar um level usando game.loadLevel', () => {
    it('o HUD deve aparecer', () => {
      const game = new Game()
      const levelConfig = CreateLevelConfiguration(
        'meu_nivel',
        'Nome do meu nivel'
      )

      game.loadLevel(levelConfig)

      expect(document.body.textContent).toContain('Nome do meu nivel')
      expect(document.body.textContent).toContain('Pontuação')
      expect(document.body.textContent).toContain('Memória')
      expect(document.body.textContent).toContain('Voltar')
      expect(document.body.textContent).toContain('Instruções adicionadas')
    })
  })

  describe('Ao carregar um level com modal associado usando game.loadLevel', () => {
    it('um modal deve aparecer com o conteúdo correto', () => {
      const game = new Game()
      const levelConfig = CreateLevelConfiguration(
        'foo_dummy',
        'Nivel básico de testes',
        [],
        2,
        2,
        [],
        'modal_level/level_1_instructions'
      )

      game.loadLevel(levelConfig)

      const container = document.body.querySelector('.modal-skeleton')

      expect(container).toBeTruthy()
      expect(container.textContent).toContain('Level 1 - Instructions')
    })
  })

  describe('Ao voltar para a seleção de níveis usando game.toLevelSelection', () => {
    it('a seleção de nível aparecer contendo os níveis registrados', async () => {
      const game = new Game()
      const levelConfig = CreateLevelConfiguration('my_level', 'Meu novo nivel registrado')

      game.registerLevels(levelConfig)
      await game.toLevelSelection()

      expect(document.body.textContent).toContain('Escolha a fase')
      expect(document.body.textContent).toContain('Meu novo nivel registrado')
    })
  })

  describe('Ao aumentar a pontuação usando game.increaseScore', () => {
    it('a pontuação na store é incrementada em 1', async () => {
      const scoreStore = new Store<number>(0)
      const game = new Game(
        new Store<Instruction[]>([]),
        new Store<MemoryShard[]>([]),
        scoreStore
      )

      game.increaseScore()

      expect(scoreStore.current).toEqual(1)
    })
  })

  describe('Ao passar para o proximo nivel usando game.toNextLevel', () => {
    it('o nivel seguinte é carregado', async () => {
      const scoreStore = new Store<number>(0)
      const level1Config = CreateLevelConfiguration('my_level_1', 'Nivel 1')
      const level2Config = CreateLevelConfiguration('my_level_2', 'Nivel 2')
      const game = new Game(
        new Store<Instruction[]>([]),
        new Store<MemoryShard[]>([]),
        scoreStore
      )
      game.registerLevels(level1Config, level2Config)
      game.loadLevel(level1Config)

      await game.toNextLevel()

      expect(document.body.textContent).toContain('Nivel 2')
    })
  })
})
