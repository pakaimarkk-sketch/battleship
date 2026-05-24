export function createGameOverPhase(match) {
  function enter(winner) {
    match.state.phase = "gameOver";
    match.state.gameOver = true;
    match.state.winner = winner;
    match.state.currentTurn = null;

    return getState();
  }

  function getWinner() {
    return match.state.winner;
  }

  function getAvailableActions() {
    return {
      canRematch: true,
      canExit: true,
      canChangeGameMode: true,
    };
  }

  function getState() {
    return {
      phase: match.state.phase,
      gameOver: match.state.gameOver,
      winner: match.state.winner,
      currentTurn: match.state.currentTurn,
      actions: getAvailableActions(),
    };
  }

  return {
    enter,
    getWinner,
    getAvailableActions,
    getState,
  };
}
