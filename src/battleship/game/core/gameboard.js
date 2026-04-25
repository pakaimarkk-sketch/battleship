class Gameboard {
  constructor() {
    this.placedShips = [];
    this.attackedTiles = [];
  }

  placeShip(ship, startX, startY, direction) {
    const coordinates = [];

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        coordinates.push({ x: startX + i, y: startY, isHit: false });
      }

      if (direction === "vertical") {
        coordinates.push({ x: startX, y: startY + i, isHit: false });
      }
    }

    this.placedShips.push({
      ship,
      coordinates,
    });
  }

  receiveAttack(x, y) {
    const alreadyAttacked = this.attackedTiles.some(
      (tile) => tile.x === x && tile.y === y,
    );

    if (alreadyAttacked) return;

    this.attackedTiles.push({ x, y });

    for (const placedShip of this.placedShips) {
      for (const coordinate of placedShip.coordinates) {
        if (coordinate.x === x && coordinate.y === y) {
          coordinate.isHit = true;
          placedShip.ship.hit();
          return "hit";
        }
      }
    }

    return "miss";
  }

  allShipsSunk() {
    return this.placedShips.every((placedShip) => placedShip.ship.isSunk());
  }
}

export default Gameboard;
