export function createPlayingPhase(match) {
  function getCurrentPlayer() {
    return match.players[match.state.currentTurn];
  }

  function getOpponentKey() {
    return match.state.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
  }

  function getOpponentPlayer() {
    return match.players[getOpponentKey()];
  }

  function switchTurn() {
    match.state.currentTurn =
      match.state.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
  }

  function attack(x, y) {
    const attacker = getCurrentPlayer();
    const opponent = getOpponentPlayer();

    const result = attacker.attack(opponent.board, x, y);

    if (result.result === "already-attacked") {
      return {
        ...result,
        winner: null,
        gameOver: false,
      };
    }

    if (opponent.board.allShipsSunk()) {
      return {
        ...result,
        winner: attacker.id,
        gameOver: true,
      };
    }

    const shouldSwitchTurn =
      result.result === "miss" ||
      (result.result === "hit" && !match.config.rules.extraTurnOnHit);

    if (shouldSwitchTurn) {
      switchTurn();
    }

    return {
      ...result,
      winner: null,
      gameOver: false,
    };
  }

  function shouldBotPlay() {
    const currentPlayer = getCurrentPlayer();

    return currentPlayer?.type === "bot";
  }

  function botAttack() {
    if (!match.botLogic) {
      throw new Error("Bot logic is missing");
    }

    const opponent = getOpponentPlayer();
    const { x, y } = match.botLogic.getAttack(opponent.board);

    const result = attack(x, y);

    return {
      x,
      y,
      result,
    };
  }

  return {
    getCurrentPlayer,
    getOpponentKey,
    getOpponentPlayer,
    attack,
    shouldBotPlay,
    botAttack,
  };
}
