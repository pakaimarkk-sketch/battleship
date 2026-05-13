import { buildMatchConfig } from "../battleship/game/setup/buildMatchConfig.js";
import { createMatch } from "../battleship/game/setup/createMatch.js";
import MatchController from "../battleship/game/core/matchController.js";
import { GAME_MODES } from "../battleship/game/modes/gameModes.js";
import { PLAYER_MODES } from "../battleship/game/modes/playerModes.js";
import { PLAYER_TYPES } from "../battleship/game/participants/playerTypes.js";

function createClassicSinglePlayerController() {
  const config = buildMatchConfig({
    gameMode: GAME_MODES.CLASSIC,
    playerMode: PLAYER_MODES.SINGLE_PLAYER,
    difficulty: "easy",
  });

  const match = createMatch(config);
  const controller = new MatchController(match);

  return { config, match, controller };
}

describe("MatchController - classic single player", () => {
  test("createMatch() creates playerOne and playerTwo", () => {
    const { match } = createClassicSinglePlayerController();

    expect(match.players.playerOne).toBeDefined();
    expect(match.players.playerTwo).toBeDefined();
  });

  test("playerOne is human and playerTwo is bot in single player mode", () => {
    const { match } = createClassicSinglePlayerController();

    expect(match.players.playerOne.type).toBe(PLAYER_TYPES.HUMAN);
    expect(match.players.playerTwo.type).toBe(PLAYER_TYPES.BOT);
  });

  test("creates a board for both players", () => {
    const { match } = createClassicSinglePlayerController();

    expect(match.players.playerOne.board).toBeDefined();
    expect(match.players.playerTwo.board).toBeDefined();
  });

  test("places the classic fleet on both boards", () => {
    const { match } = createClassicSinglePlayerController();

    expect(match.players.playerOne.board.placedShips).toHaveLength(5);
    expect(match.players.playerTwo.board.placedShips).toHaveLength(5);
  });

  test("starts with playerOne turn and playing phase", () => {
    const { controller } = createClassicSinglePlayerController();

    expect(controller.getState()).toMatchObject({
      currentTurn: "playerOne",
      winner: null,
      gameOver: false,
      phase: "playing",
      mode: GAME_MODES.CLASSIC,
      playerMode: PLAYER_MODES.SINGLE_PLAYER,
      difficulty: "easy",
    });
  });

  test("hit keeps the current turn when extraTurnOnHit is true", () => {
    const { controller } = createClassicSinglePlayerController();

    const result = controller.handlePlayerAttack(0, 0);

    expect(result.result).toBe("hit");
    expect(controller.getState().currentTurn).toBe("playerOne");
  });

  test("repeated attack does not switch turn", () => {
    const { controller } = createClassicSinglePlayerController();

    controller.handlePlayerAttack(0, 0);
    const repeatedResult = controller.handlePlayerAttack(0, 0);

    expect(repeatedResult.result).toBe("already-attacked");
    expect(controller.getState().currentTurn).toBe("playerOne");
  });

  test("miss switches turn to playerTwo", () => {
    const { controller } = createClassicSinglePlayerController();

    const result = controller.handlePlayerAttack(9, 9);

    expect(result.result).toBe("miss");
    expect(controller.getState().currentTurn).toBe("playerTwo");
  });

  test("handleBotTurn() returns null when current player is not bot", () => {
    const { controller } = createClassicSinglePlayerController();

    const result = controller.handleBotTurn();

    expect(result).toBeNull();
    expect(controller.getState().currentTurn).toBe("playerOne");
  });

  test("handleBotTurn() attacks when playerTwo is current player", () => {
    const { controller, match } = createClassicSinglePlayerController();

    controller.handlePlayerAttack(9, 9);

    const botAttack = controller.handleBotTurn();

    expect(botAttack).toHaveProperty("x");
    expect(botAttack).toHaveProperty("y");
    expect(botAttack).toHaveProperty("result");

    expect(match.players.playerOne.board.attackedTiles).toContainEqual({
      x: botAttack.x,
      y: botAttack.y,
    });
  });

  test("sinking all playerTwo ships ends the match with playerOne as winner", () => {
    const { controller } = createClassicSinglePlayerController();

    const allPlayerTwoShipTiles = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],

      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],

      [0, 4],
      [1, 4],
      [2, 4],

      [0, 6],
      [1, 6],
      [2, 6],

      [0, 8],
      [1, 8],
    ];

    for (const [x, y] of allPlayerTwoShipTiles) {
      controller.handlePlayerAttack(x, y);
    }

    expect(controller.getState()).toMatchObject({
      currentTurn: null,
      winner: "playerOne",
      gameOver: true,
      phase: "gameOver",
    });
  });
});
