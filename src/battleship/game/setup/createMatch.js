import Gameboard from "../core/gameboard.js";
import Player from "../participants/player.js";
import { PLAYER_TYPES } from "../participants/playerTypes.js";
import { PLAYER_MODES } from "../modes/playerModes.js";
import { createBotLogic } from "../config/bot/createBotLogic.js";
import { placePresetFleet } from "./placePresetFleet.js";

export function createMatch(config) {
  const playerOneBoard = new Gameboard(config.board);
  const playerTwoBoard = new Gameboard(config.board);

  placePresetFleet(playerOneBoard, config.ships, config.placement);
  placePresetFleet(playerTwoBoard, config.ships, config.placement);

  const playerOne = new Player({
    id: "playerOne",
    name: "Player 1",
    type: PLAYER_TYPES.HUMAN,
    board: playerOneBoard,
  });

  const playerTwo = new Player({
    id: "playerTwo",
    name:
      config.match.playerMode === PLAYER_MODES.SINGLE_PLAYER
        ? "Computer"
        : "Player 2",

    type:
      config.match.playerMode === PLAYER_MODES.SINGLE_PLAYER
        ? PLAYER_TYPES.BOT
        : PLAYER_TYPES.HUMAN,

    board: playerTwoBoard,
  });

  const botLogic =
    config.match.playerMode === PLAYER_MODES.SINGLE_PLAYER
      ? createBotLogic(config.match.difficulty)
      : null;

  return {
    config,

    players: {
      playerOne,
      playerTwo,
    },

    state: {
      currentTurn: "playerOne",
      winner: null,
      gameOver: false,
      phase: "playing",
    },

    botLogic,
  };
}
