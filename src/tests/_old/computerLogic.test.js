import ComputerLogic from "../battleship/game/computerLogic.js";
import Gameboard from "../battleship/game/gameboard.js";

describe("ComputerLogic", () => {
  test("defaults to easy difficulty", () => {
    const computer = new ComputerLogic();

    expect(computer.difficulty).toBe("easy");
  });

  test("getMove() returns coordinates", () => {
    const computer = new ComputerLogic();
    const enemyBoard = new Gameboard();

    const move = computer.getMove(enemyBoard);

    expect(move).toHaveProperty("x");
    expect(move).toHaveProperty("y");
  });

  test("getMove() returns coordinates within board bounds", () => {
    const computer = new ComputerLogic();
    const enemyBoard = new Gameboard();

    const move = computer.getMove(enemyBoard);

    expect(move.x).toBeGreaterThanOrEqual(0);
    expect(move.x).toBeLessThanOrEqual(9);
    expect(move.y).toBeGreaterThanOrEqual(0);
    expect(move.y).toBeLessThanOrEqual(9);
  });

  test("getMove() does not return an already attacked tile", () => {
    const computer = new ComputerLogic();
    const enemyBoard = new Gameboard();

    enemyBoard.attackedTiles = [{ x: 0, y: 0 }];

    const move = computer.getMove(enemyBoard);

    expect(move).not.toEqual({ x: 0, y: 0 });
  });
});
