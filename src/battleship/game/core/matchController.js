class MatchController {
  constructor(match) {
    this.match = match;
  }

  getCurrentPlayer() {
    return this.match.players[this.match.state.currentTurn];
  }

  getOpponentKey() {
    return this.match.state.currentTurn === "playerOne"
      ? "playerTwo"
      : "playerOne";
  }

  getOpponentPlayer() {
    return this.match.players[this.getOpponentKey()];
  }

  handlePlayerAttack(x, y) {
    if (this.match.state.gameOver) return null;

    const attacker = this.getCurrentPlayer();
    const opponent = this.getOpponentPlayer();

    const result = attacker.attack(opponent.board, x, y);

    if (result.result === "already-attacked") {
      return result;
    }

    if (opponent.board.allShipsSunk()) {
      this.endMatch(attacker.id);
      return result;
    }

    const shouldSwitchTurn =
      result.result === "miss" ||
      (result.result === "hit" && !this.match.config.rules.extraTurnOnHit);

    if (shouldSwitchTurn) {
      this.switchTurn();
    }

    return result;
  }

  handleBotTurn() {
    if (this.match.state.gameOver) return null;

    const currentPlayer = this.getCurrentPlayer();

    if (currentPlayer.type !== "bot") {
      return null;
    }

    if (!this.match.botLogic) {
      throw new Error("Bot logic is missing");
    }

    const opponent = this.getOpponentPlayer();
    const { x, y } = this.match.botLogic.getAttack(opponent.board);

    const result = this.handlePlayerAttack(x, y);

    return { x, y, result };
  }

  switchTurn() {
    this.match.state.currentTurn =
      this.match.state.currentTurn === "playerOne" ? "playerTwo" : "playerOne";
  }

  endMatch(winner) {
    this.match.state.gameOver = true;
    this.match.state.winner = winner;
    this.match.state.phase = "gameOver";
    this.match.state.currentTurn = null;
  }

  getState() {
    return {
      currentTurn: this.match.state.currentTurn,
      winner: this.match.state.winner,
      gameOver: this.match.state.gameOver,
      phase: this.match.state.phase,
      mode: this.match.config.mode,
      playerMode: this.match.config.match.playerMode,
      difficulty: this.match.config.match.difficulty,
    };
  }
}

export default MatchController;
