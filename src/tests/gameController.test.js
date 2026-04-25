import GameController from "../battleship/game/gameController.js";

describe("GameController", () => {
  test("startGame() creates both players", () => {
    const game = new GameController();

    game.startGame();

    expect(game.humanPlayer).not.toBeNull();
    expect(game.computerPlayer).not.toBeNull();
  });

  test("startGame() creates computer logic", () => {
    const game = new GameController();

    game.startGame();

    expect(game.computerLogic).not.toBeNull();
  });

  test("startGame() sets initial turn to human", () => {
    const game = new GameController();

    game.startGame();

    expect(game.currentTurn).toBe("human");
  });

  test("startGame() resets winner and gameOver", () => {
    const game = new GameController();

    game.winner = "computer";
    game.gameOver = true;

    game.startGame();

    expect(game.winner).toBeNull();
    expect(game.gameOver).toBe(false);
  });

  test("startGame() places 5 ships on human board", () => {
    const game = new GameController();

    game.startGame();

    expect(game.humanPlayer.board.placedShips).toHaveLength(5);
  });

  test("startGame() places 5 ships on computer board", () => {
    const game = new GameController();

    game.startGame();

    expect(game.computerPlayer.board.placedShips).toHaveLength(5);
  });

  test("handlePlayerAttack() attacks computer board and changes turn", () => {
    const game = new GameController();

    game.startGame();

    const result = game.handlePlayerAttack(9, 9);

    expect(game.computerPlayer.board.attackedTiles).toContainEqual({
      x: 9,
      y: 9,
    });
    expect(game.currentTurn).toBe("computer");
    expect(result).toBe("miss");
  });

  test("handlePlayerAttack() returns null if it is not human turn", () => {
    const game = new GameController();

    game.startGame();
    game.currentTurn = "computer";

    const result = game.handlePlayerAttack(0, 0);

    expect(result).toBeNull();
  });

  test("handleComputerTurn() attacks human board and changes turn back", () => {
    const game = new GameController();

    game.startGame();
    game.currentTurn = "computer";

    const move = game.handleComputerTurn();

    expect(move).toHaveProperty("x");
    expect(move).toHaveProperty("y");
    expect(move).toHaveProperty("result");

    expect(game.humanPlayer.board.attackedTiles).toContainEqual({
      x: move.x,
      y: move.y,
    });

    expect(game.currentTurn).toBe("human");
  });

  test("handleComputerTurn() returns null if it is not computer turn", () => {
    const game = new GameController();

    game.startGame();
    game.currentTurn = "human";

    const result = game.handleComputerTurn();

    expect(result).toBeNull();
  });

  test("checkWinner() sets winner to human if computer board is sunk", () => {
    const game = new GameController();

    game.startGame();

    game.computerPlayer.board.placedShips.forEach((placedShip) => {
      while (!placedShip.ship.isSunk()) {
        placedShip.ship.hit();
      }
    });

    game.checkWinner();

    expect(game.gameOver).toBe(true);
    expect(game.winner).toBe("human");
  });

  test("checkWinner() sets winner to computer if human board is sunk", () => {
    const game = new GameController();

    game.startGame();

    game.humanPlayer.board.placedShips.forEach((placedShip) => {
      while (!placedShip.ship.isSunk()) {
        placedShip.ship.hit();
      }
    });

    game.checkWinner();

    expect(game.gameOver).toBe(true);
    expect(game.winner).toBe("computer");
  });
});
