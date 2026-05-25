import { randomPlacement } from "./strategies/botPlacementStrategies.js";
import {
  createAttackMemory,
  strategyCheckerboardAttack,
  strategyHuntMode,
  updateHuntMemory,
} from "./strategies/botAttackStrategies.js";

class HardBotLogic {
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

    return strategyCheckerboardAttack(enemyBoard);
  }

  recordAttackResult(attack, result) {
    updateHuntMemory(this.attackMemory, attack, result);
  }
}

export default HardBotLogic;
