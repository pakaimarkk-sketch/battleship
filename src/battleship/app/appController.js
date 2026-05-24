import { createMatch } from "./game/setup/createMatch.js";
import MatchController from "./game/core/matchController.js";

import { renderGameLayout } from "./ui/layout/gameLayout.js";
import { renderBoard } from "./ui/renderer/boardRenderer.js";
import { renderGameOverPanel } from "./ui/renderer/gameOverRenderer.js";

import { bindPlacementActions } from "./ui/actions/placementActions.js";
import { bindGameActions } from "./ui/actions/gameActions.js";
import { bindGameOverActions } from "./ui/actions/gameOverActions.js";

import { showScreen } from "./screenController.js";

let currentConfig = null;
let currentController = null;

export function startMatch(config) {
  currentConfig = config;

  const match = createMatch(config);
  currentController = new MatchController(match);

  showScreen("game");

  renderGameLayout();

  renderBoard({
    owner: "playerOne",
    board: currentController.match.players.playerOne.board,
    isEnemyBoard: false,
    controller: currentController,
  });

  renderBoard({
    owner: "playerTwo",
    board: currentController.match.players.playerTwo.board,
    isEnemyBoard: true,
    controller: currentController,
  });

  bindPlacementActions(currentController);
  bindGameActions(currentController);

  bindGameOverActions({
    onRematch: () => {
      startMatch(currentConfig);
    },

    onExit: () => {
      showScreen("mainMenu");
    },

    onChangeGameMode: () => {
      showScreen("modeSelect");
    },
  });
}
