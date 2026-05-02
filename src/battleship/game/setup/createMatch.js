import { Gameboard } from "../core/gameboard.js";
import { Player } from "../core/player.js";
import { createBotLogic } from "../bot/createBotLogic.js";

export function createMatch(config) {
  const playerOne = new Player({
    board: new Gameboard(config.board),
  });

  const playerTwo = createOpponent(config);

  return {
    config,
    players: [playerOne, playerTwo],
    currentTurn: playerOne,
    phase: "placement",
    winner: null,
    gameOver: false,
  };
}

function createOpponent(config) {
  if (config.match.playerMode === "singlePlayer") {
    return new Player({
      board: new Gameboard(config.board),
      bot: createBotLogic(config.match.difficulty),
    });
  }

  return new Player({
    board: new Gameboard(config.board),
  });
}
