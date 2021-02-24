import { LevelList } from '../../levels'

export enum LevelState { Unknown, Unlocked, Completed }

type LevelSave = {
  name: string,
  state: LevelState,
  bestScore: number
}

export const SaveLevelState = (
  levelName: string,
  levelState: LevelState,
  score: number = 0,
) => {
  if (!window.localStorage) {
    console.warn('localStorage não disponível')
    return
  }

  const serialized = JSON.stringify({
    name: levelName,
    state: maxLevelState(levelName, levelState),
    score: maxScore(levelName, score),
  })
  localStorage.setItem(levelName, serialized)
}

export const LoadLevelSave = (levelName: string): LevelSave | null => {
  if (!window.localStorage) {
    console.warn('localStorage não disponível')
    return null
  }

  const levelSave = localStorage.getItem(levelName)
  const isFirstLevel = levelName === LevelList[0]?.name
  if (!levelSave) {
    if (isFirstLevel) {
      return {
        name: levelName,
        state: LevelState.Unlocked,
        bestScore: 0,
      }
    }
    return null
  }

  return JSON.parse(levelSave) as LevelSave
}

const maxLevelState = (levelName: string, state: LevelState): LevelState => {
  const level = LoadLevelSave(levelName)

  if (!level) {
    return state
  }

  return Math.max(state, level.state)
}

const maxScore = (levelName: string, score: number): number => {
  const level = LoadLevelSave(levelName)

  if (!level) {
    return score
  }

  return Math.max(score, level.bestScore)
}
