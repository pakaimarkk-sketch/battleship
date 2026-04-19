import Player from "../battleship/game/player.js";
import Gameboard from "../battleship/game/gameboard.js";
import Ship from "../battleship/game/ship.js";

describe("Player", () => {
  test("stores the given board", () => {
    const board = new Gameboard();
    const player = new Player(board);

    expect(player.board).toBe(board);
  });

  test("attack() returns miss when attacking an empty enemy tile", () => {
    const playerBoard = new Gameboard();
    const enemyBoard = new Gameboard();
    const player = new Player(playerBoard);

    const result = player.attack(enemyBoard, 5, 5);

    expect(result).toBe("miss");
  });

  test("attack() returns hit when attacking an enemy ship", () => {
    const playerBoard = new Gameboard();
    const enemyBoard = new Gameboard();
    const enemyShip = new Ship(3);

    enemyBoard.placeShip(enemyShip, 2, 4, "horizontal");

    const player = new Player(playerBoard);
    const result = player.attack(enemyBoard, 3, 4);

    expect(result).toBe("hit");
  });
});
