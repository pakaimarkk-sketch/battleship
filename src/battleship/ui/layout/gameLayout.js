import {
  createTextElement,
  appendChildren,
  createEl,
} from "../../utils/domHelpers.js";

import { createBoardLayout } from "./boardLayout.js";

export function createGameLayout(controller) {
  const boardSize = controller.match.config.board.size;

  const screen = createEl("main", null, "game-screen");

  const title = createTextElement("h1", "Battleship", null, "game-title");

  const status = createTextElement("p", "", null, "game-status");
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

  appendChildren(boards, playerBoard, enemyBoard);

  return appendChildren(screen, title, status, boards);
}
