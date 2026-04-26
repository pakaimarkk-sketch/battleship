class EasyBotLogic {
  getAttack(enemyBoard) {
    let x;
    let y;
    let alreadyAttacked = true;

    while (alreadyAttacked) {
      x = Math.floor(Math.random() * enemyBoard.size);
      y = Math.floor(Math.random() * enemyBoard.size);

      alreadyAttacked = enemyBoard.attackedTiles.some((tile) => {
        return tile.x === x && tile.y === y;
      });
    }

    return { x, y };
  }

  placeShips(board, fleet) {
    for (const ship of fleet) {
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * board.size);
        const y = Math.floor(Math.random() * board.size);
        const rotation = this.getRandomRotation();

        const result = board.placeShip(ship, x, y, rotation);

        if (result.success) {
          placed = true;
        }
      }
    }
  }

  getRandomRotation() {
    const rotations = [0, 90, 180, 270];
    const index = Math.floor(Math.random() * rotations.length);

    return rotations[index];
  }
}

export default EasyBotLogic;
