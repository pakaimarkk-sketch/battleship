import "./styles.css";

import { buildMatchConfig } from "./battleship/game/setup/buildMatchConfig.js";
import { createMatch } from "./battleship/game/setup/createMatch.js";
import MatchController from "./battleship/game/core/matchController.js";
import { GAME_MODES } from "./battleship/game/modes/gameModes.js";
import { PLAYER_MODES } from "./battleship/game/modes/playerModes.js";

const config = buildMatchConfig({
  gameMode: GAME_MODES.CLASSIC,
  playerMode: PLAYER_MODES.SINGLE_PLAYER,
  difficulty: "easy",
});

const match = createMatch(config);
const controller = new MatchController(match);

console.log("MATCH CREATED:", match);
console.log("INITIAL STATE:", controller.getState());

const attackOne = controller.handlePlayerAttack(0, 0);
console.log("ATTACK 1:", attackOne);
console.log("STATE AFTER ATTACK 1:", controller.getState());

const repeatedAttack = controller.handlePlayerAttack(0, 0);
console.log("REPEATED ATTACK:", repeatedAttack);
console.log("STATE AFTER REPEATED:", controller.getState());

const missAttack = controller.handlePlayerAttack(9, 9);
console.log("MISS ATTACK:", missAttack);
console.log("STATE AFTER MISS:", controller.getState());

const botAttacks = controller.handleBotTurn();

console.log("BOT ATTACKS:", botAttacks);
console.log("STATE AFTER BOT:", controller.getState());

const allPlayerTwoShipTiles = [
  // carrier y:0 size 5
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],

  // battleship y:2 size 4
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],

  // cruiser y:4 size 3
  [0, 4],
  [1, 4],
  [2, 4],

  // submarine y:6 size 3
  [0, 6],
  [1, 6],
  [2, 6],

  // destroyer y:8 size 2
  [0, 8],
  [1, 8],
];

for (const [x, y] of allPlayerTwoShipTiles) {
  const result = controller.handlePlayerAttack(x, y);

  console.log(`ATTACK ${x},${y}:`, result);
  console.log("STATE:", controller.getState());

  if (controller.getState().gameOver) {
    break;
  }
}
