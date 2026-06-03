import {
  createTextElement,
  appendChildren,
  createEl,
  createDiv,
} from "../../utils/domHelpers.js";

import { createBoardLayout } from "./boardLayout.js";

export function createGameLayout(controller) {
  const boardSize = controller.match.config.board.size;

  const screen = createEl("main", null, "game-screen");

  const title = createTextElement("h1", "Battleship", null, "game-title");

  const status = createEl("div", null, "game-status");
  status.dataset.role = "game-status";

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

  const abilitiesContainer = createDiv(null, "abilities-container");

  const areaScanBtn = createEl("button", null, "ability-btn");
  areaScanBtn.dataset.abilityId = "areaScan";
  areaScanBtn.textContent = "Area Scan";

  const carpetBombBtn = createEl("button", null, "ability-btn");
  carpetBombBtn.dataset.abilityId = "carpetBomb";
  carpetBombBtn.textContent = "Carpet Bomb";

  const nukeBtn = createEl("button", null, "ability-btn");
  nukeBtn.dataset.abilityId = "nuke";
  nukeBtn.textContent = "Nuke";

  appendChildren(
    boards,
    playerBoard,
    enemyBoard,
    abilitiesContainer,
    areaScanBtn,
    carpetBombBtn,
    nukeBtn,
  );

  return appendChildren(screen, title, status, boards);
}
