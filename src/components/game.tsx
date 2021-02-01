import { useParams } from 'react-router';
import { GameInstance } from '../core/game';

const Game = () => {
  const { levelName }: { levelName: string } = useParams();
  const game = GameInstance();
  game.loadLevelByName(levelName);
  const component = game?.board?.component;

  return <div>{component}</div>;
};

export default Game;
