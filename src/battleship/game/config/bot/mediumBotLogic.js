import { placeShipsRandomly } from "./botPlacementUtils.js";

class MediumBotLogic {
  constructor() {
    this.hits = [];
  }

  placeShips(board, fleet) {
    return placeShipsRandomly(board, fleet);
  }

  getAttack(enemyBoard) {
    const target = this.getTargetAttack(enemyBoard);

    if (target) {
      return target;
    }

    return this.getRandomAttack(enemyBoard);
  }

  recordAttackResult(attack, result) {
    if (result.result === "hit") {
      this.hits.push(attack);
    }
  }

  getTargetAttack(enemyBoard) {
    while (this.hits.length > 0) {
      const hit = this.hits[0];
      const adjacentTiles = this.getAdjacentUnattackedTiles(
        enemyBoard,
        hit.x,
        hit.y,
      );

      if (adjacentTiles.length > 0) {
        return this.getRandomItem(adjacentTiles);
      }

      this.hits.shift();
    }

    return null;
  }

  getAdjacentUnattackedTiles(board, x, y) {
    const candidates = [
      { x, y: y - 1 },
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x - 1, y },
    ];

    return candidates.filter(({ x, y }) => {
      return (
        x >= 0 &&
        x < board.size &&
        y >= 0 &&
        y < board.size &&
        !board.wasAttacked(x, y)
      );
    });
  }

  getRandomAttack(board) {
    const unattackedTiles = [];

    for (let y = 0; y < board.size; y += 1) {
      for (let x = 0; x < board.size; x += 1) {
        if (!board.wasAttacked(x, y)) {
          unattackedTiles.push({ x, y });
        }
      }
    }

    return this.getRandomItem(unattackedTiles);
  }

  getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
}

export default MediumBotLogic;
