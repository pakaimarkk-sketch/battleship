import Ship from "../../../core/ship.js";
import { rotateShape } from "../../ships/shipUtils.js";

export function randomPlacement(board, fleet) {
  const occupiedCoords = new Set();

  for (const shipDefinition of fleet) {
    const placementResult = placeSingleShipRandomly(
      board,
      shipDefinition,
      occupiedCoords,
    );

    if (!placementResult.success) {
      return placementResult;
    }
  }

  return { success: true };
}

function placeSingleShipRandomly(board, shipDefinition, occupiedCoords) {
  const validPlacements = getValidPlacements(
    board,
    shipDefinition,
    occupiedCoords,
  );

  if (validPlacements.length === 0) {
    return {
      success: false,
      reason: "no-valid-placement",
      ship: shipDefinition,
    };
  }

  while (validPlacements.length > 0) {
    const placementIndex = Math.floor(Math.random() * validPlacements.length);
    const [placement] = validPlacements.splice(placementIndex, 1);

    const ship = new Ship(shipDefinition);

    const result = board.placeShip(
      ship,
      placement.x,
      placement.y,
      placement.rotation,
    );

    if (result.success) {
      markOccupied(result.coordinates, occupiedCoords);
      return { success: true };
    }
  }

  return {
    success: false,
    reason: "no-valid-placement-after-board-check",
    ship: shipDefinition,
  };
}

function getValidPlacements(board, shipDefinition, occupiedCoords) {
  const rotations = [0, 90, 180, 270];
  const validPlacements = [];

  for (let y = 0; y < board.size; y += 1) {
    for (let x = 0; x < board.size; x += 1) {
      for (const rotation of rotations) {
        const coordinates = getShipCoordinates(shipDefinition, x, y, rotation);

        if (!isWithinBoard(coordinates, board.size)) continue;
        if (hasCollision(coordinates, occupiedCoords)) continue;

        validPlacements.push({ x, y, rotation });
      }
    }
  }

  return validPlacements;
}

function getShipCoordinates(shipDefinition, startX, startY, rotation) {
  const rotatedShape = rotateShape(shipDefinition.shape, rotation);

  return rotatedShape.map(([offsetX, offsetY]) => ({
    x: startX + offsetX,
    y: startY + offsetY,
  }));
}

function isWithinBoard(coordinates, boardSize) {
  return coordinates.every(({ x, y }) => {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  });
}

function hasCollision(coordinates, occupiedCoords) {
  return coordinates.some(({ x, y }) => {
    return occupiedCoords.has(getCoordKey(x, y));
  });
}

function markOccupied(coordinates, occupiedCoords) {
  coordinates.forEach(({ x, y }) => {
    occupiedCoords.add(getCoordKey(x, y));
  });
}

function getCoordKey(x, y) {
  return `${x},${y}`;
}
