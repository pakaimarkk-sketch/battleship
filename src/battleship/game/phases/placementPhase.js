export function createPlacementPhase(match) {
  function placeShip(playerKey, x, y) {
    const placementSession = match.placement[playerKey];

    if (!placementSession) {
      return {
        success: false,
        reason: "missing-placement-session",
      };
    }

    return placementSession.placeCurrentShipAt(x, y);
  }

  function rotateShip(playerKey) {
    const placementSession = match.placement[playerKey];

    if (!placementSession) {
      return null;
    }

    return placementSession.rotateShip();
  }

  function isComplete(playerKey) {
    return match.placement[playerKey].getState().complete;
  }

  function canStartPlaying() {
    return isComplete("playerOne") && isComplete("playerTwo");
  }

  return {
    placeShip,
    rotateShip,
    isComplete,
    canStartPlaying,
  };
}
