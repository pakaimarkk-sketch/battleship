import { getRotatedShape } from "../config/ships/shipUtils";

class Gameboard {
  constructor(config) {
    this.size = config.size;
    this.placedShips = [];
    this.attackedTiles = [];
  }

  placeShip(ship, startX, startY, rotation = 0) {
    const shape = getRotatedShape(ship.shape, rotation);
    const coordinates = shape.map(([x, y]) => ({
      x: startX + x,
      y: startY + y,
      isHit: false,
    }));

    if (!this.isInsideBoard(coordinates)) {
      return { success: false, reason: "out-of-bounds" };
    }

    if (this.hasCollision(coordinates)) {
      return { success: false, reason: "collision" };
    }

    this.placedShips.push({
      ship,
      coordinates,
    });

    return { success: true, coordinates };
  }

  isInsideBoard(coordinates) {
    return coordinates.every(({ x, y }) => {
      return x >= 0 && x < this.size && y >= 0 && y < this.size;
    });
  }

  hasCollision(coordinates) {
    return coordinates.some(({ x, y }) => {
      return this.placedShips.some((placedShip) => {
        return placedShip.coordinates.some((coordinate) => {
          return coordinate.x === x && coordinate.y === y;
        });
      });
    });
  }

  receiveAttack(x, y) {
    const alreadyAttacked = this.attackedTiles.some(
      (tile) => tile.x === x && tile.y === y,
    );

    if (alreadyAttacked) {
      return {
        result: "already-attacked",
        x,
        y,
        ship: null,
        sunk: false,
      };
    }

    this.attackedTiles.push({ x, y });

    for (const placedShip of this.placedShips) {
      const coordinate = placedShip.coordinates.find((coord) => {
        return coord.x === x && coord.y === y;
      });

      if (coordinate) {
        coordinate.isHit = true;
        placedShip.ship.hit();

        return {
          result: "hit",
          x,
          y,
          ship: placedShip.ship,
          sunk: placedShip.ship.isSunk(),
        };
      }
    }

    return {
      result: "miss",
      x,
      y,
      ship: null,
      sunk: false,
    };
  }

  allShipsSunk() {
    if (this.placedShips.length === 0) {
      return false;
    }

    return this.placedShips.every((placedShip) => placedShip.ship.isSunk());
  }

  getFleetStatus() {
    return this.placedShips.map((placedShip) => ({
      id: placedShip.ship.id,
      name: placedShip.ship.name,
      size: placedShip.ship.size,
      hits: placedShip.ship.hits,
      sunk: placedShip.ship.isSunk(),
    }));
  }
}

export default Gameboard;
