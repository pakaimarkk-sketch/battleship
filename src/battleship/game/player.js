class Player {
  constructor(board) {
    this.board = board;
  }

  attack(enemyBoard, x, y) {
    return enemyBoard.receiveAttack(x, y);
  }
}

export default Player;
