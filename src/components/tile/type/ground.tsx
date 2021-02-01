import { Vector } from '../../../math/vector';

const Ground = ({ position, size }: { position: Vector; size: number }) => {
  const left = position.x * size;
  const top = position.y * size;

  const cssPos: 'absolute' = 'absolute';

  const style = {
    position: cssPos,
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}px`,
    top: `${top}px`,
    backgroundColor: '#4976f2',
    border: '1px solid #2926d2',
  };
  return <div style={style}></div>;
};

export default Ground;
