import { Vector } from '../../../math/vector';

const Block = ({ position, size }: { position: Vector; size: number }) => {
  const left = position.x * size;
  const top = position.y * size;

  const cssPos: 'absolute' = 'absolute';

  const style = {
    position: cssPos,
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}px`,
    top: `${top}px`,
    backgroundColor: 'black',
    border: '1px solid black',
  };
  return <div style={style}></div>;
};

export default Block;
