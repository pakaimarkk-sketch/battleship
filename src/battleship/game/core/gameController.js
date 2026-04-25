import Player from "../participants/player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import ComputerLogic from "../participants/computerLogic.js";

class GameController {
  constructor() {
    this.humanPlayer = null;
    this.computerPlayer = null;
    this.computerLogic = null;
    this.currentTurn = null;
    this.winner = null;
    this.gameOver = false;
  }

  startGame() {
    this.humanPlayer = new Player(new Gameboard());
    this.computerPlayer = new Player(new Gameboard());
    this.computerLogic = new ComputerLogic("easy");

    this.currentTurn = "human";
    this.winner = null;
    this.gameOver = false;

    this.setupBoards();
  }

  setupBoards() {
    const humanFleet = this.createFleet();
    const computerFleet = this.createFleet();

    this.placePresetFleet(this.humanPlayer.board, humanFleet);
    this.placePresetFleet(this.computerPlayer.board, computerFleet);
  }

  createFleet() {
    return [5, 4, 3, 3, 2].map((length) => new Ship(length));
  }

  placePresetFleet(board, fleet) {
    board.placeShip(fleet[0], 0, 0, "horizontal");
    board.placeShip(fleet[1], 0, 2, "horizontal");
    board.placeShip(fleet[2], 0, 4, "horizontal");
    board.placeShip(fleet[3], 0, 6, "horizontal");
    board.placeShip(fleet[4], 0, 8, "horizontal");
  }

  handlePlayerAttack(x, y) {
    if (this.gameOver) return null;
    if (this.currentTurn !== "human") return null;

    const result = this.humanPlayer.attack(this.computerPlayer.board, x, y);

    this.checkWinner();

    if (!this.gameOver) {
      this.currentTurn = "computer";
    }

    return result;
  }

  handleComputerTurn() {
    if (this.gameOver) return null;
    if (this.currentTurn !== "computer") return null;

    const { x, y } = this.computerLogic.getMove(this.humanPlayer.board);
    const result = this.computerPlayer.attack(this.humanPlayer.board, x, y);

    this.checkWinner();

    if (!this.gameOver) {
      this.currentTurn = "human";
    }

    return { x, y, result };
  }

  checkWinner() {
    if (this.humanPlayer.board.allShipsSunk()) {
      this.gameOver = true;
      this.winner = "computer";
      return;
    }

    if (this.computerPlayer.board.allShipsSunk()) {
      this.gameOver = true;
      this.winner = "human";
    }
  }
}

export default GameController;
