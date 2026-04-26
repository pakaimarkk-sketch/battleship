export function rotateShape(shape, rotation) {
  if (rotation === 0) return shape;

  if (rotation === 90) {
    return shape.map(([x, y]) => [y, -x]);
  }

  if (rotation === 180) {
    return shape.map(([x, y]) => [-x, -y]);
  }

  if (rotation === 270) {
    return shape.map(([x, y]) => [-y, x]);
  }

  throw new Error(`Invalid rotation: ${rotation}`);
}

export function normalizeShape(shape) {
  const minX = Math.min(...shape.map(([x]) => x));
  const minY = Math.min(...shape.map(([, y]) => y));

  return shape.map(([x, y]) => [x - minX, y - minY]);
}

export function getRotatedShape(shape, rotation) {
  return normalizeShape(rotateShape(shape, rotation));
}
