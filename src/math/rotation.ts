export const ToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export enum Direction {
  EAST = 0,
  SOUTH = 90,
  WEST = 180,
  NORTH = 270,
}
