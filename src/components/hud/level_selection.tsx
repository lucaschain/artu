import { LevelConfiguration } from '../../core/level_configuration';
import { useHistory } from 'react-router';

const LevelSelection = ({ levelList }: { levelList: LevelConfiguration[] }) => {
  const history = useHistory();

  const onClickLevel = (levelName: string) => () => {
    history.push(`/fase/${levelName}`);
  };
  return (
    <div>
      levels
      {levelList.map(({ label, name }) => (
        <div key={name} onClick={onClickLevel(name)}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default LevelSelection;
