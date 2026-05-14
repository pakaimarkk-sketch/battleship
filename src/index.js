import "./styles.css";

import { buildMatchConfig } from "./battleship/game/setup/buildMatchConfig.js";
import { createMatch } from "./battleship/game/setup/createMatch.js";
import MatchController from "./battleship/game/core/matchController.js";
import { GAME_MODES } from "./battleship/game/modes/gameModes.js";
import { PLAYER_MODES } from "./battleship/game/modes/playerModes.js";
import { createGameLayout } from "./battleship/ui/layout/gameLayout.js";
import { renderInitialGame } from "./battleship/ui/renderer/gameRenderer.js";
import { bindGameActions } from "./battleship/ui/actions/gameActions.js";

const config = buildMatchConfig({
  gameMode: GAME_MODES.CLASSIC,
  playerMode: PLAYER_MODES.SINGLE_PLAYER,
  difficulty: "easy",
});

const match = createMatch(config);
const controller = new MatchController(match);

const app = document.querySelector("#app");

app.append(createGameLayout(controller));

renderInitialGame(controller);

bindGameActions(controller);
