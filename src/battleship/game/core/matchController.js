import { createPlacementPhase } from "../phases/placementPhase.js";
import { createPlayingPhase } from "../phases/playingPhase.js";
import { createGameOverPhase } from "../phases/gameOverPhase.js";
import { useAbility } from "../abilities/abilityController.js";

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

  getCurrentPlayer() {
    return this.phases.playing.getCurrentPlayer();
  }

  getOpponentPlayer() {
    return this.phases.playing.getOpponentPlayer();
  }

  placePlayerOneShip(x, y) {
    if (this.match.state.phase !== "placement") {
      return {
        success: false,
        reason: "not-placement-phase",
      };
    }

    const result = this.phases.placement.placeShip("playerOne", x, y);

    if (result.success && this.phases.placement.canStartPlaying()) {
      this.startPlaying();
    }

    return result;
  }

  rotatePlayerOneShip() {
    if (this.match.state.phase !== "placement") {
      return null;
    }

    return this.phases.placement.rotateShip("playerOne");
  }

  startPlaying() {
    this.match.state.phase = "playing";
    this.match.state.currentTurn = "playerOne";
  }

  submitAttack(playerId, x, y) {
    if (this.match.state.phase !== "playing") {
      return {
        result: "invalid-phase",
        reason: "not-playing-phase",
        x,
        y,
        gameOver: false,
        winner: null,
      };
    }

    if (this.match.state.currentTurn !== playerId) {
      return {
        result: "invalid-turn",
        reason: "not-current-player",
        x,
        y,
        gameOver: false,
        winner: null,
      };
    }

    const result = this.phases.playing.attack(x, y);

    if (result.gameOver) {
      this.phases.gameOver.enter(result.winner);
    }

    return result;
  }

  shouldBotPlay() {
    if (this.match.state.phase !== "playing") {
      return false;
    }

    return this.phases.playing.shouldBotPlay();
  }

  submitAutoAttack() {
    if (!this.shouldBotPlay()) {
      return null;
    }

    const botAttack = this.phases.playing.botAttack();

    if (botAttack.result.gameOver) {
      this.phases.gameOver.enter(botAttack.result.winner);
    }

    return botAttack;
  }

  canUseAbility(playerId, ability) {
    if (this.match.state.phase !== "playing") {
      return {
        success: false,
        reason: "not-playing-phase",
      };
    }

    if (this.match.state.currentTurn !== playerId) {
      return {
        success: false,
        reason: "not-current-player",
      };
    }

    if (!this.match.config.abilities?.enabled) {
      return {
        success: false,
        reason: "abilities-disabled",
      };
    }

    if (!ability) {
      return {
        success: false,
        reason: "missing-ability",
      };
    }

    return {
      success: true,
      attacker: this.getCurrentPlayer(),
      defender: this.getOpponentPlayer(),
    };
  }

  submitAbility(playerId, ability, x, y) {
    const validation = this.canUseAbility(playerId, ability);

    if (!validation.success) {
      return validation;
    }

    const { attacker, defender } = validation;

    const abilityResult = useAbility({
      ability,
      targetX: x,
      targetY: y,
      attacker,
      opponentBoard: defender.board,
    });

    const result = {
      ...abilityResult,
      attackerId: attacker.id,
      defenderId: defender.id,
      x,
      y,
    };

    if (defender.board.allShipsSunk()) {
      this.phases.gameOver.enter(attacker.id);

      return {
        ...result,
        gameOver: true,
        winner: attacker.id,
      };
    }

    this.match.state.currentTurn = defender.id;

    return {
      ...result,
      gameOver: false,
      winner: null,
    };
  }

  getGameOverState() {
    return this.phases.gameOver.getState();
  }
}

export default MatchController;
