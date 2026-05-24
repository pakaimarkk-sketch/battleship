import { placeShipsRandomly } from "./botPlacementUtils";

class EasyBotLogic {
  placeShips(board, fleet) {
    return placeShipsRandomly(board, fleet);
  }

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
}

export default EasyBotLogic;
