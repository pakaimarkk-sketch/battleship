import { PLAYER_TYPES } from "./playerTypes.js";

class Player {
  constructor({ id, name, type = PLAYER_TYPES.HUMAN, board, isReady = false }) {
    if (!id) {
      throw new Error("Player requires an id");
    }

    if (!board) {
      throw new Error("Player requires a board");
    }

    this.id = id;
    this.name = name ?? id;
    this.type = type;
    this.board = board;
    this.isReady = isReady;
  }

  attack(enemyBoard, x, y) {
    return enemyBoard.receiveAttack(x, y);
  }

  setReady(isReady = true) {
    this.isReady = isReady;
  }

  isBot() {
    return this.type === PLAYER_TYPES.BOT;
  }

  isHuman() {
    return this.type === PLAYER_TYPES.HUMAN;
  }

  isRemote() {
    return this.type === PLAYER_TYPES.REMOTE;
  }
}

export default Player;
