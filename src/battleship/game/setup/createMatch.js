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
