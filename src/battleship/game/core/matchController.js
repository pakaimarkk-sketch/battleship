import { createPlacementPhase } from "../phases/placementPhase.js";
import { createPlayingPhase } from "../phases/playingPhase.js";
import { createGameOverPhase } from "../phases/gameOverPhase.js";

class MatchController {
  constructor(match) {
    this.match = match;

    this.phases = {
      placement: createPlacementPhase(match),
      playing: createPlayingPhase(match),
      gameOver: createGameOverPhase(match),
    };
  }

  placePlayerOneShip(x, y) {
    if (this.match.state.phase !== "placement") {
      return {
        success: false,
        reason: "not-placement-phase",
      };
    }

    const result = this.phases.placement.placeShip("playerOne", x, y);

    if (!result.success) {
      return result;
    }

    if (this.phases.placement.canStartPlaying()) {
      this.startPlayingPhase();
    }

    return result;
  }

  rotatePlayerOneShip() {
    if (this.match.state.phase !== "placement") {
      return null;
    }

    return this.phases.placement.rotateShip("playerOne");
  }

  handlePlayerAttack(x, y) {
    if (this.match.state.phase !== "playing") {
      return {
        success: false,
        reason: "not-playing-phase",
      };
    }

    if (this.match.state.gameOver) {
      return null;
    }

    const result = this.phases.playing.attack(x, y);

    if (result.gameOver) {
      this.endMatch(result.winner);
    }

    return result;
  }

  handleBotTurn() {
    if (this.match.state.phase !== "playing") {
      return null;
    }

    if (!this.phases.playing.shouldBotPlay()) {
      return null;
    }

    const botResult = this.phases.playing.botAttack();

    if (botResult.result.gameOver) {
      this.endMatch(botResult.result.winner);
    }

    return botResult;
  }

  startPlayingPhase() {
    this.match.state.phase = "playing";
    this.match.state.currentTurn = "playerOne";
  }

  endMatch(winner) {
    return this.phases.gameOver.enter(winner);
  }

  getState() {
    return {
      ...this.match.state,
      mode: this.match.config.mode,
      playerMode: this.match.config.match.playerMode,
      difficulty: this.match.config.match.difficulty,
    };
  }
}

export default MatchController;
