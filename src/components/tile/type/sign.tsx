import { Vector } from '../../../math/vector';

const Sign = ({ position, size }: { position: Vector; size: number }) => {
  const left = position.x * size;
  const top = position.y * size;

  const cssPos: 'absolute' = 'absolute';

  const style = {
    position: cssPos,
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}px`,
    top: `${top}px`,
    backgroundColor: '#ff0',
    border: '1px solid #ff0',
  };
  return <div style={style}></div>;
};

export default Sign;
