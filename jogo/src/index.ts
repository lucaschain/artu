import './infra/styles'

import { GameInstance }  from './core/game'
import { LevelList } from './levels'

const game = GameInstance()

game.registerLevels(...LevelList)

game.toLevelSelection()
