import Gameboard from "../battleship/game/core/gameboard.js";
import Ship from "../battleship/game/core/ship.js";

function createTestShip() {
  return new Ship({
    id: "test-ship",
    name: "Test Ship",
    size: 3,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  });
}

describe("Gameboard", () => {
  test("starts with empty placedShips and attackedTiles", () => {
    const board = new Gameboard({ size: 10 });

    expect(board.placedShips).toEqual([]);
    expect(board.attackedTiles).toEqual([]);
  });

  test("placeShip() places a ship with rotation 0", () => {
    const board = new Gameboard({ size: 10 });
    const ship = createTestShip();

    const result = board.placeShip(ship, 2, 4, 0);

    expect(result.success).toBe(true);
    expect(board.placedShips).toHaveLength(1);
    expect(board.placedShips[0].coordinates).toEqual([
      { x: 2, y: 4, isHit: false },
      { x: 3, y: 4, isHit: false },
      { x: 4, y: 4, isHit: false },
    ]);
  });

  test("placeShip() rejects out-of-bounds placement", () => {
    const board = new Gameboard({ size: 10 });
    const ship = createTestShip();

    const result = board.placeShip(ship, 8, 0, 0);

    expect(result).toMatchObject({
      success: false,
      reason: "out-of-bounds",
    });

    expect(board.placedShips).toHaveLength(0);
  });

  test("placeShip() rejects collision", () => {
    const board = new Gameboard({ size: 10 });
    const firstShip = createTestShip();
    const secondShip = createTestShip();

    board.placeShip(firstShip, 0, 0, 0);
    const result = board.placeShip(secondShip, 1, 0, 0);

    expect(result).toMatchObject({
      success: false,
      reason: "collision",
    });

    expect(board.placedShips).toHaveLength(1);
  });

  test("receiveAttack() returns miss for empty tile", () => {
    const board = new Gameboard({ size: 10 });

    const result = board.receiveAttack(5, 5);

    expect(result.result).toBe("miss");
    expect(board.attackedTiles).toContainEqual({ x: 5, y: 5 });
  });

  test("receiveAttack() returns hit and increases ship hits", () => {
    const board = new Gameboard({ size: 10 });
    const ship = createTestShip();

    board.placeShip(ship, 2, 4, 0);

    const result = board.receiveAttack(3, 4);

    expect(result.result).toBe("hit");
    expect(result.ship).toBe(ship);
    expect(ship.hits).toBe(1);
  });

  test("receiveAttack() marks the matching coordinate as hit", () => {
    const board = new Gameboard({ size: 10 });
    const ship = createTestShip();

    board.placeShip(ship, 2, 4, 0);
    board.receiveAttack(3, 4);

    expect(board.placedShips[0].coordinates).toEqual([
      { x: 2, y: 4, isHit: false },
      { x: 3, y: 4, isHit: true },
      { x: 4, y: 4, isHit: false },
    ]);
  });

  test("receiveAttack() does not add the same attacked tile twice", () => {
    const board = new Gameboard({ size: 10 });

    board.receiveAttack(5, 5);
    const result = board.receiveAttack(5, 5);

    expect(result.result).toBe("already-attacked");
    expect(board.attackedTiles).toEqual([{ x: 5, y: 5 }]);
  });

  test("allShipsSunk() returns false when no ships are placed", () => {
    const board = new Gameboard({ size: 10 });

    expect(board.allShipsSunk()).toBe(false);
  });
});
