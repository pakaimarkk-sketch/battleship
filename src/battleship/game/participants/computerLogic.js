class ComputerLogic {
  constructor(difficulty = "easy") {
    this.difficulty = difficulty;
  }

  getMove(enemyBoard) {
    if (this.difficulty === "easy") {
      return this.getEasyMove(enemyBoard);
    }
  }

  getEasyMove(enemyBoard) {
    let x;
    let y;
    let alreadyAttacked = true;

    while (alreadyAttacked) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      alreadyAttacked = enemyBoard.attackedTiles.some(
        (tile) => tile.x === x && tile.y === y,
      );
    }

    return { x, y };
  }
}

export default ComputerLogic;
