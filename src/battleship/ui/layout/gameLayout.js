import {
  createTextElement,
  appendChildren,
  createEl,
  createButton,
} from "../../utils/domHelpers.js";

import { createBoardLayout } from "./boardLayout.js";

export function createGameLayout(controller) {
  const boardSize = controller.match.config.board.size;

  const screen = createEl("main", null, "game-screen");
  const title = createTextElement("h1", "Battleship", null, "game-title");

  const status = createEl("div", null, "game-status");
  status.dataset.role = "game-status";

  const abilities = createAbilityPanel(controller);

  const boards = createEl("div", null, "boards");

  const playerBoard = createBoardLayout({
    owner: "playerOne",
    boardSize,
    title: "Your Board",
  });

  const enemyBoard = createBoardLayout({
    owner: "playerTwo",
    boardSize,
    title: "Enemy Board",
  });

  appendChildren(boards, playerBoard, enemyBoard);

  return appendChildren(screen, title, status, abilities, boards);
}

function createAbilityPanel(controller) {
  const panel = createEl("div", null, "ability-panel");
  panel.dataset.role = "ability-panel";

  if (!controller.match.config.abilities?.enabled) {
    return panel;
  }

  const areaScanButton = createButton("Area Scan", null, "ability-button");
  areaScanButton.dataset.abilityId = "areaScan";

  const carpetBombButton = createButton("Carpet Bomb", null, "ability-button");
  carpetBombButton.dataset.abilityId = "carpetBomb";

  const nukeButton = createButton("Nuke", null, "ability-button");
  nukeButton.dataset.abilityId = "nuke";

  appendChildren(panel, areaScanButton, carpetBombButton, nukeButton);

  return panel;
}
