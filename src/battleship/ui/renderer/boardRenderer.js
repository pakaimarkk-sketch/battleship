export function renderBoard({ owner, board, isEnemyBoard }) {
  for (let y = 0; y < board.size; y += 1) {
    for (let x = 0; x < board.size; x += 1) {
      updateTile({
        owner,
        board,
        x,
        y,
        isEnemyBoard,
      });
    }
  }
}

export function updateTile({ owner, board, x, y, isEnemyBoard }) {
  const tile = getTileElement(owner, x, y);

  if (!tile) return;

  tile.className = "tile";

  const tileState = getTileState({
    board,
    x,
    y,
    isEnemyBoard,
  });

  tile.classList.add(tileState);
}

function getTileElement(owner, x, y) {
  return document.querySelector(
    `.tile[data-owner="${owner}"][data-x="${x}"][data-y="${y}"]`,
  );
}

function getTileState({ board, x, y, isEnemyBoard }) {
  const wasAttacked = board.attackedTiles.some((tile) => {
    return tile.x === x && tile.y === y;
  });

  const shipCoordinate = findShipCoordinate(board, x, y);

  if (wasAttacked && shipCoordinate) {
    return "hit";
  }

  if (wasAttacked && !shipCoordinate) {
    return "miss";
  }

  if (!isEnemyBoard && shipCoordinate) {
    return "ship";
  }

  return "empty";
}

function findShipCoordinate(board, x, y) {
  for (const placedShip of board.placedShips) {
    const coordinate = placedShip.coordinates.find((coord) => {
      return coord.x === x && coord.y === y;
    });

    if (coordinate) {
      return coordinate;
    }
  }

  return null;
}
