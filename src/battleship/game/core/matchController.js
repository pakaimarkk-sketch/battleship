class MatchController {
  constructor(match) {
    if (!match) {
      throw new Error("MatchController requires a match");
    }

    this.match = match;

    this.phases = {
      placement: createPlacementPhase(match),
      playing: createPlayingPhase(match),
      gameOver: createGameOverPhase(match),
    };
  }

  getState() {
    return this.match.state;
  }

  getPlayers() {
    return this.match.players;
  }

  getPlayer(playerId) {
    return this.match.players[playerId] ?? null;
  }

  getCurrentPlayer() {
    return this.getPlayer(this.match.state.currentTurn);
  }

  getOpponentOf(playerId) {
    const players = this.getPlayers();

    const opponentId = Object.keys(players).find((id) => id !== playerId);

    if (!opponentId) {
      return null;
    }

    return players[opponentId];
  }

  getCurrentAgent() {
    if (!this.agents) {
      return null;
    }

    const currentPlayer = this.getCurrentPlayer();

    if (!currentPlayer) {
      return null;
    }

    return this.agents.getForPlayer(currentPlayer);
  }

  canAttack(playerId, x, y) {
    const state = this.getState();

    if (state.phase !== "playing") {
      return {
        success: false,
        reason: "not-playing-phase",
      };
    }

    if (state.gameOver) {
      return {
        success: false,
        reason: "game-over",
      };
    }

    if (state.currentTurn !== playerId) {
      return {
        success: false,
        reason: "not-your-turn",
      };
    }

    const attacker = this.getPlayer(playerId);

    if (!attacker) {
      return {
        success: false,
        reason: "unknown-attacker",
      };
    }

    const defender = this.getOpponentOf(playerId);

    if (!defender) {
      return {
        success: false,
        reason: "missing-defender",
      };
    }

    if (!defender.board.isInsideCoordinate?.(x, y)) {
      return {
        success: false,
        reason: "out-of-bounds",
      };
    }

    return {
      success: true,
      attacker,
      defender,
    };
  }

  submitAttack(playerId, x, y) {
    const validation = this.canAttack(playerId, x, y);

    if (!validation.success) {
      return validation;
    }

    const { attacker, defender } = validation;

    const attackResult = attacker.attack(defender.board, x, y);

    const result = {
      success: true,
      attackerId: attacker.id,
      defenderId: defender.id,
      x,
      y,
      attack: attackResult,
    };

    this.notifyAgentAboutAttackResult(attacker.id, result);

    this.checkGameOver(defender);

    if (!this.match.state.gameOver) {
      this.advanceTurn(result);
    }

    return result;
  }

  notifyAgentAboutAttackResult(playerId, result) {
    if (!this.agents) return;

    const agent = this.agents.get(playerId);

    if (!agent) return;

    agent.receiveAttackResult(result);
  }

  advanceTurn(result) {
    const rules = this.match.config.rules;

    const wasHit =
      result.attack.result === "hit" || result.attack.result === "sunk";

    if (rules.extraTurnOnHit && wasHit) {
      return;
    }

    const opponent = this.getOpponentOf(result.attackerId);

    if (!opponent) {
      throw new Error("Cannot advance turn without opponent");
    }

    this.match.state.currentTurn = opponent.id;
  }

  checkGameOver(defender) {
    const rules = this.match.config.rules;

    if (rules.winCondition !== "sinkAllShips") {
      throw new Error(`Unsupported win condition: ${rules.winCondition}`);
    }

    if (defender.board.allShipsSunk()) {
      this.match.state.gameOver = true;
      this.match.state.phase = "gameOver";
      this.match.state.winner = this.getOpponentOf(defender.id).id;
    }
  }

  getAutoAttack() {
    const currentPlayer = this.getCurrentPlayer();
    const currentAgent = this.getCurrentAgent();

    if (!currentPlayer || !currentAgent) {
      return null;
    }

    if (!currentAgent.canAutoPlay()) {
      return null;
    }

    const opponent = this.getOpponentOf(currentPlayer.id);

    if (!opponent) {
      return null;
    }

    return currentAgent.getAttack({
      enemyBoard: opponent.board,
      matchState: this.getState(),
    });
  }

  submitAutoAttack() {
    const currentPlayer = this.getCurrentPlayer();

    if (!currentPlayer) {
      return {
        success: false,
        reason: "missing-current-player",
      };
    }

    const attack = this.getAutoAttack();

    if (!attack) {
      return {
        success: false,
        reason: "no-auto-attack-available",
      };
    }

    return this.submitAttack(currentPlayer.id, attack.x, attack.y);
  }

  startPlaying() {
    this.match.state.phase = "playing";
    this.match.state.currentTurn = "playerOne";
  }
}

export default MatchController;
