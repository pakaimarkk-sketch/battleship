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

    if (!analysis.target) {
      throw new Error("Hard bot has no valid attack target");
    }

    return analysis.target;
  }

  recordAttackResult(attack, result) {
    if (result.result === "already-attacked") return;

    this.attackHistory.push({
      coordinate: attack,
      result: result.sunk ? "sunk" : result.result,
      sunkCoordinates: result.shipCoordinates,
    });

    if (result.sunk && result.ship) {
      this.remainingFleet = this.remainingFleet.filter(
        (ship) => ship.id !== result.ship.id,
      );
    }
  }
}

export default HardBotLogic;
