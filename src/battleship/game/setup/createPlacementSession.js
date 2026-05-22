import Ship from "../core/ship.js";

export function createPlacementSession({ board, ships }) {
  let currentShipIndex = 0;
  let rotation = 0;

  function getCurrentShipDefinition() {
    return ships[currentShipIndex] ?? null;
  }

  function getState() {
    return {
      currentShipIndex,
      currentShip: getCurrentShipDefinition(),
      rotation,
      complete: currentShipIndex >= ships.length,
    };
  }

  function rotateShip() {
    rotation = (rotation + 90) % 360;
    return getState();
  }

  function placeCurrentShipAt(x, y) {
    const shipDefinition = getCurrentShipDefinition();

    if (!shipDefinition) {
      return {
        success: false,
        reason: "placement-complete",
      };
    }

    const ship = new Ship(shipDefinition);
    const result = board.placeShip(ship, x, y, rotation);

    if (!result.success) {
      return result;
    }

    currentShipIndex += 1;
    rotation = 0;

    return {
      ...result,
      complete: currentShipIndex >= ships.length,
      nextShip: getCurrentShipDefinition(),
    };
  }

  function placeCurrentShipWithPosition(position) {
    rotation = position.rotation ?? 0;
    return placeCurrentShipAt(position.x, position.y);
  }

  function placeFromPositions(positions) {
    const results = [];

    for (const position of positions) {
      const result = placeCurrentShipWithPosition(position);
      results.push(result);

      if (!result.success) {
        return {
          success: false,
          reason: result.reason,
          failedPosition: position,
          results,
        };
      }
    }

    return {
      success: true,
      complete: getState().complete,
      results,
    };
  }

  return {
    getState,
    rotateShip,
    placeCurrentShipAt,
    placeCurrentShipWithPosition,
    placeFromPositions,
  };
}
