import { relative } from 'path';
import { Fragment } from 'react';
import { Tile } from '../core/tile';

const Board = ({
  tiles,
  columns,
  rows,
  tileSize,
}: {
  tiles: Tile[];
  columns: number;
  rows: number;
  tileSize: number;
}) => {
  return (
    <div
      style={{
        width: tileSize * columns,
        height: tileSize * rows,
        backgroundColor: '#ff0',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {tiles.map((tile: Tile) => {
        return (
          <Fragment key={`${tile.position.x}${tile.position.y}`}>
            {tile.component}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Board;
