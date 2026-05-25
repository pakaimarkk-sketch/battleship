import { createPlacementPhase } from "../phases/placementPhase.js";
import { createPlayingPhase } from "../phases/playingPhase.js";
import { createGameOverPhase } from "../phases/gameOverPhase.js";

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

  getGameOverState() {
    return this.phases.gameOver.getState();
  }
}

export default MatchController;
