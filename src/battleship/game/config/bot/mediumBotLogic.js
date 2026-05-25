import { randomPlacement } from "./strategies/botPlacementStrategies.js";
import {
  createAttackMemory,
  strategyHuntMode,
  strategyRandomAttack,
  updateHuntMemory,
} from "./strategies/botAttackStrategies.js";

class MediumBotLogic {
  constructor() {
    this.attackMemory = createAttackMemory();
  }

  placeShips(board, fleet) {
    return randomPlacement(board, fleet);
  }

  getAttack(enemyBoard) {
    const huntTarget = strategyHuntMode(enemyBoard, this.attackMemory);

    if (huntTarget) {
      return huntTarget;
    }

    return strategyRandomAttack(enemyBoard);
  }

  recordAttackResult(attack, result) {
    updateHuntMemory(this.attackMemory, attack, result);
  }
}

export default MediumBotLogic;
