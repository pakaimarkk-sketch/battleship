import { getAreaCoordinates } from "./abilityUtils.js";

export const abilityEffects = {
  scanArea({ effect, targetX, targetY, opponentBoard }) {
    const coordinates = getAreaCoordinates({
      startX: targetX,
      startY: targetY,
      width: effect.width,
      height: effect.height,
      boardSize: opponentBoard.size,
    });

    return coordinates.map(({ x, y }) => {
      const hasShip = opponentBoard.placedShips.some((placedShip) =>
        placedShip.coordinates.some((coord) => coord.x === x && coord.y === y),
      );

      return {
        x,
        y,
        result: hasShip ? "ship-present" : "empty",
      };
    });
  },

  attackArea({ effect, targetX, targetY, attacker, opponentBoard }) {
    const coordinates = getAreaCoordinates({
      startX: targetX,
      startY: targetY,
      width: effect.width,
      height: effect.height,
      boardSize: opponentBoard.size,
    });

    return coordinates.map(({ x, y }) => {
      const result = attacker.attack(opponentBoard, x, y);

      return {
        x,
        y,
        ...result,
      };
    });
  },
};
