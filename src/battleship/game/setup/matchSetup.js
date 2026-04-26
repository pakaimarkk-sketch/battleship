import Player from "../participants/player.js";
import Gameboard from "../core/gameboard.js";
import Ship from "../core/ship.js";
import { createBotLogic } from "../bot/createBotLogic.js";

export function createMatch(config) {
  const humanPlayer = new Player(new Gameboard(config.board));
  const computerPlayer = new Player(new Gameboard(config.board));

  const humanFleet = createFleet(config.ships);
  const computerFleet = createFleet(config.ships);

  placePresetFleet(humanPlayer.board, humanFleet, config.placement.positions);

  const botLogic = createBotLogic(config.difficulty);
  botLogic.placeShips(computerPlayer.board, computerFleet);

  return {
    config,
    players: {
      human: humanPlayer,
      computer: computerPlayer,
    },
    botLogic,
  };
}

function createFleet(shipDefinitions) {
  return shipDefinitions.map((definition) => new Ship(definition));
}

function placePresetFleet(board, fleet, positions) {
  fleet.forEach((ship, index) => {
    const position = positions[index];

    const result = board.placeShip(
      ship,
      position.x,
      position.y,
      position.rotation,
    );

    if (!result.success) {
      throw new Error(`Failed to place ship: ${ship.name}`);
    }
  });
}
