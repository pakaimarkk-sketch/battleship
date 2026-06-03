export function getAreaCoordinates({
  startX,
  startY,
  width,
  height,
  boardSize,
}) {
  const coordinates = [];

  for (let y = startY; y < startY + height; y += 1) {
    for (let x = startX; x < startX + width; x += 1) {
      if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        coordinates.push({ x, y });
      }
    }
  }

  return coordinates;
}
