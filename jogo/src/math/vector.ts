export type Vector = {
  x: number,
  y: number,
}

export const VectorSum = (vecA: Vector, vecB: Vector) => {
  return {
    x: vecA.x + vecB.x,
    y: vecA.y + vecB.y,
  }
}
