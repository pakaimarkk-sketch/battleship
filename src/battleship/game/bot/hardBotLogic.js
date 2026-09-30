import { randomPlacement } from "./strategies/botPlacementStrategies.js";
import { TargetingEngine } from "./botTargetingEngine.js";

class HardBotLogic {
  constructor({ fleet = [] } = {}) {
    this.fleet = fleet;
    this.remainingFleet = [...fleet];
    this.attackHistory = [];
    this.targetingEngine = new TargetingEngine();
  }

  placeShips(board, fleet) {
    return randomPlacement(board, fleet);
  }

  getAttack(enemyBoard) {
    const analysis = this.targetingEngine.chooseTarget({
      boardSize: enemyBoard.size,
      remainingFleet: this.remainingFleet,
      attackHistory: this.attackHistory,
    });

    return analysis.target;
  }

  recordAttackResult(attack, result) {
    this.attackHistory.push({
      coordinate: attack,
      result: result.sunk ? "sunk" : result.result,
      sunkCoordinates: result.shipCoordinates,
    });

    if (result.sunk && result.ship) {
      this.remainingFleet = this.remainingFleet.filter((ship) => {
        return ship.id !== result.ship.id;
      });
    }
  }
}

export default HardBotLogic;
