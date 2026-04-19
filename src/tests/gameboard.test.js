import Gameboard from "../battleship/game/gameboard.js";
import Ship from "../battleship/game/ship.js";

describe("Gameboard", () => {
  test("starts with empty placedShips", () => {
    const gameboard = new Gameboard();

    expect(gameboard.placedShips).toEqual([]);
  });

  test("starts with empty attackedTiles", () => {
    const gameboard = new Gameboard();

    expect(gameboard.attackedTiles).toEqual([]);
  });

  test("placeShip() stores a ship with horizontal coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 4, "horizontal");

    expect(gameboard.placedShips).toHaveLength(1);
    expect(gameboard.placedShips[0].ship).toBe(ship);
    expect(gameboard.placedShips[0].coordinates).toEqual([
      { x: 2, y: 4, isHit: false },
      { x: 3, y: 4, isHit: false },
      { x: 4, y: 4, isHit: false },
    ]);
  });

  test("placeShip() stores a ship with vertical coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 4, "vertical");

    expect(gameboard.placedShips).toHaveLength(1);
    expect(gameboard.placedShips[0].coordinates).toEqual([
      { x: 2, y: 4, isHit: false },
      { x: 2, y: 5, isHit: false },
      { x: 2, y: 6, isHit: false },
    ]);
  });

  test("receiveAttack() adds attacked tile", () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack(5, 5);

    expect(gameboard.attackedTiles).toEqual([{ x: 5, y: 5 }]);
  });

  test("receiveAttack() returns miss for empty tile", () => {
    const gameboard = new Gameboard();

    const result = gameboard.receiveAttack(5, 5);

    expect(result).toBe("miss");
  });

  test("receiveAttack() returns hit when attacking a ship", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 4, "horizontal");

    const result = gameboard.receiveAttack(3, 4);

    expect(result).toBe("hit");
  });

  test("receiveAttack() increases ship hits when ship is attacked", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 4, "horizontal");
    gameboard.receiveAttack(3, 4);

    expect(ship.hits).toBe(1);
  });

  test("receiveAttack() marks the correct coordinate as hit", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 4, "horizontal");
    gameboard.receiveAttack(3, 4);

    expect(gameboard.placedShips[0].coordinates).toEqual([
      { x: 2, y: 4, isHit: false },
      { x: 3, y: 4, isHit: true },
      { x: 4, y: 4, isHit: false },
    ]);
  });

  test("receiveAttack() does not add the same attacked tile twice", () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(5, 5);

    expect(gameboard.attackedTiles).toEqual([{ x: 5, y: 5 }]);
  });
});
