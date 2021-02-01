import { Store } from '../infra/store';

import { SaveLevelState, LevelState } from '../infra/save';

import { MemoryShard } from './memory';
import { LevelConfiguration } from './level_configuration';
import { Board } from './board';
import { Hero } from './hero';
import { Instruction } from './instruction';
import { LevelList } from '../levels';

export class Game {
  private hero: Hero;
  public board: Board;
  private instructionStore = new Store<Instruction[]>([]);
  private memoryStore = new Store<MemoryShard[]>([]);
  private scoreStore = new Store<number>(0);
  private levelList: LevelConfiguration[] = [];
  private currentLevelIndex: number = 0;

  public loadLevel(levelConfig: LevelConfiguration): void {
    console.log(levelConfig);
    const currentLevelIndex = this.levelIndexByName(levelConfig.name);
    if (currentLevelIndex != null) {
      this.currentLevelIndex = currentLevelIndex;
    }

    this.board = new Board(
      levelConfig.width,
      levelConfig.height,
      levelConfig.tiles,
    );

    const startPosition = levelConfig.startPosition || { x: 0, y: 0 };
    this.hero = new Hero(
      this.board,
      startPosition,
      levelConfig.startDirection,
      this.memoryStore,
    );
  }

  public async toLevelSelection() {
    this.unloadLevel();
  }

  public async toNextLevel() {
    this.saveLevel();
    if (this.nextLevel) {
      await this.unloadLevel();
      this.loadLevel(this.nextLevel);
    }
  }

  public increaseScore(amount = 1) {
    const currentScore = this.scoreStore.current;
    this.scoreStore.update(currentScore + amount);
  }

  public registerLevels(levels: LevelConfiguration[]): void {
    console.log(levels, 'levels');
    this.levelList = [...levels];
  }

  public loadLevelByName(levelName: string) {
    const levelConfig = this.levelConfigByName(levelName);
    console.log(levelConfig, 'levelByName', levelName);
    if (!levelConfig) return;
    this.loadLevel(levelConfig);
  }

  public get currentLevel(): LevelConfiguration {
    return this.levelList[this.currentLevelIndex];
  }

  private async unloadLevel() {
    this.clear();
    this.reset();
  }

  private async reset() {
    this.scoreStore.update(0);
    await this.hero?.reset();
    this.board?.reset();
  }

  private clear(): void {
    this.instructionStore.update([]);
  }

  private get nextLevel(): LevelConfiguration {
    return this.levelList[this.currentLevelIndex + 1];
  }

  private saveLevel() {
    SaveLevelState(
      this.currentLevel.name,
      LevelState.Completed,
      this.scoreStore.current,
    );
  }

  private eraseLastInstruction() {
    const newInstructions = this.instructionStore.current.slice(0, -1);
    this.instructionStore.update(newInstructions);
  }

  private levelIndexByName(levelName: string): number | null {
    return this.levelList
      .map((levelConfig, index) => ({ levelConfig, index }))
      .filter(({ levelConfig }) => {
        return levelName === levelConfig.name;
      })[0]?.index;
  }

  private levelConfigByName(levelName: string): LevelConfiguration {
    console.log(this.levelList.length, this.levelList);
    return this.levelList.filter(levelConfig => {
      return levelName === levelConfig.name;
    })[0];
  }
}

let gameInstance: Game;
export const GameInstance = (): Game => {
  if (!gameInstance) {
    gameInstance = new Game();
    gameInstance.registerLevels(LevelList);
  }
  return gameInstance;
};
