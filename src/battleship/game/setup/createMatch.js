import Gameboard from "../core/gameboard.js";
import Player from "../participants/player.js";
import { PLAYER_TYPES } from "../participants/playerTypes.js";
import { PLAYER_MODES } from "../modes/playerModes.js";
import { createBotLogic } from "../config/bot/createBotLogic.js";
import { createPlacementSession } from "./createPlacementSession.js";

export function createMatch(config) {
  const playerOneBoard = new Gameboard(config.board);
  const playerTwoBoard = new Gameboard(config.board);

  const isSinglePlayer = config.match.playerMode === PLAYER_MODES.SINGLE_PLAYER;

  const playerOnePlacement = createPlacementSession({
    board: playerOneBoard,
    ships: config.ships,
  });

  const playerTwoPlacement = isSinglePlayer
    ? null
    : createPlacementSession({
        board: playerTwoBoard,
        ships: config.ships,
      });

  const botLogic = isSinglePlayer
    ? createBotLogic(config.match.difficulty)
    : null;

  if (botLogic) {
    const placementResult = botLogic.placeShips(playerTwoBoard, config.ships);

    if (!placementResult.success) {
      throw new Error(`Bot placement failed: ${placementResult.reason}`);
    }
  }

  const playerOne = new Player({
    id: "playerOne",
    name: "Player 1",
    type: PLAYER_TYPES.HUMAN,
    board: playerOneBoard,
  });

  const playerTwo = new Player({
    id: "playerTwo",
    name: isSinglePlayer ? "Computer" : "Player 2",
    type: isSinglePlayer ? PLAYER_TYPES.BOT : PLAYER_TYPES.HUMAN,
    board: playerTwoBoard,
  });

  return {
    config,

    players: {
      playerOne,
      playerTwo,
    },

    placement: {
      playerOne: playerOnePlacement,
      playerTwo: playerTwoPlacement,
    },

    state: {
      currentTurn: null,
      winner: null,
      gameOver: false,
      phase: "placement",
    },

    botLogic,
  };
}
