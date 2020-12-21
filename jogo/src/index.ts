import './infra/styles'

import Game from './core/game'
import { LevelList } from './levels'

const game = new Game()

game.loadLevel(LevelList[0])
