import { randomPlacement } from "./strategies/botPlacementStrategies.js;";
import { strategyRandomAttack } from "./strategies/botAttackStrategies.js";

class EasyBotLogic {
  placeShips(board, fleet) {
    return randomPlacement(board, fleet);
  }

  getAttack(enemyBoard) {
    return strategyRandomAttack(enemyBoard);
  }

  recordAttackResult() {}
}

export default EasyBotLogic;
