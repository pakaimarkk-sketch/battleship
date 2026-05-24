import { PLAYER_MODES } from "../modes/playerModes.js";

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

    if (!placementSession) return null;

    return placementSession.rotateShip();
  }

  function isComplete(playerKey) {
    const placementSession = match.placement[playerKey];

    if (!placementSession) return false;

    return placementSession.getState().complete;
  }

  function isBotReady() {
    return (
      match.players.playerTwo.board.placedShips.length ===
      match.config.ships.length
    );
  }

  function canStartPlaying() {
    const playerOneComplete = isComplete("playerOne");

    if (match.config.match.playerMode === PLAYER_MODES.SINGLE_PLAYER) {
      return playerOneComplete && isBotReady();
    }

    return playerOneComplete && isComplete("playerTwo");
  }

  return {
    placeShip,
    rotateShip,
    isComplete,
    canStartPlaying,
  };
}
