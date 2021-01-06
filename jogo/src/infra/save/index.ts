export enum LevelState {
  Unknown, Unlocked, Completed
}

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
    state: levelState,
    score: maxScore(levelName, score)
  })
  localStorage.setItem(levelName, serialized)
}

export const LoadLevelState = (levelName: string): LevelSave => {
  if (!window.localStorage) {
    console.warn('localStorage não disponível')
    return null
  }

  const levelSave = localStorage.getItem(levelName)
  if (!levelSave) {
    return null
  }

  const unserialized = JSON.parse(levelSave) as LevelSave
  return unserialized
}

const maxScore = (levelName: string, score: number): number => {
  const level = LoadLevelState(levelName)

  if (!level) {
    return score
  }

  return Math.max(score, level.bestScore)
}
