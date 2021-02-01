import { Vector } from '../../../math/vector';

const Goal = ({ position, size }: { position: Vector; size: number }) => {
  const left = position.x * size;
  const top = position.y * size;

  const cssPos: 'absolute' = 'absolute';

  const style = {
    position: cssPos,
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}px`,
    top: `${top}px`,
    backgroundColor: '#a2f1c0',
    border: '1px solid #a2f1c0',
  };
  return <div style={style}></div>;
};

export default Goal;
