import { createMatch } from "..createMatch.js";
import MatchController from "..matchController.js";

import { renderGameLayout } from "..gameLayout.js";
import { renderBoard } from "..boardRenderer.js";
import { renderGameOverPanel } from "..gameOverRenderer.js";

import { bindPlacementActions } from "..placementActions.js";
import { bindGameActions } from "..gameActions.js";
import { bindGameOverActions } from "..gameOverActions.js";

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
