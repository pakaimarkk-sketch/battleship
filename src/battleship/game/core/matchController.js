import Player from "../participants/player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { createBotLogic } from "../config/bot/createBotLogic.js";

class MatchController {
  constructor(match) {
    this.match = match;

    this.currentTurn = "human";
    this.winner = null;
    this.gameOver = false;
    this.phase = "playing";
  }

  handlePlayerAttack(x, y) {
    if (this.gameOver) return null;
    if (this.currentTurn !== "human") return null;

    const result = this.match.players.human.attack(
      this.match.players.computer.board,
      x,
      y,
    );

    this.checkWinner();

    if (!this.gameOver) {
      this.currentTurn = "computer";
    }

    return result;
  }

  handleComputerTurn() {
    if (this.gameOver) return null;
    if (this.currentTurn !== "computer") return null;

    const { x, y } = this.match.botLogic.getAttack(
      this.match.players.human.board,
    );

    const result = this.match.players.computer.attack(
      this.match.players.human.board,
      x,
      y,
    );

    this.checkWinner();

    if (!this.gameOver) {
      this.currentTurn = "human";
    }

    return { x, y, result };
  }

  checkWinner() {
    if (this.match.players.human.board.allShipsSunk()) {
      this.endMatch("computer");
      return;
    }

    if (this.match.players.computer.board.allShipsSunk()) {
      this.endMatch("human");
    }
  }

  endMatch(winner) {
    this.gameOver = true;
    this.winner = winner;
    this.phase = "gameOver";
    this.currentTurn = null;
  }

  getState() {
    return {
      currentTurn: this.currentTurn,
      winner: this.winner,
      gameOver: this.gameOver,
      phase: this.phase,
      mode: this.match.config.mode,
      playerMode: this.match.config.playerMode,
      difficulty: this.match.config.difficulty,
    };
  }
}

export default MatchController;
