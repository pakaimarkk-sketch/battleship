import {
  createEl,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function renderGameOverPanel(controller) {
  const existingPanel = document.querySelector(".game-over-panel");

  if (existingPanel) {
    existingPanel.remove();
  }

  const state = controller.getState();

  if (!state.gameOver) {
    return;
  }

  const gameScreen = document.querySelector(".game-screen");

  if (!gameScreen) {
    return;
  }

  const overlay = createEl("div", null, "game-over-overlay");
  const panel = createEl("section", null, "game-over-panel");

  const title = createTextElement("h2", "Game Over", null, "game-over-title");

  const winnerText = createTextElement(
    "p",
    `${state.winner} wins!`,
    null,
    "game-over-winner",
  );

  const actions = createEl("div", null, "game-over-actions");

  const rematchButton = createGameOverButton("Rematch", "rematch");
  const changeModeButton = createGameOverButton(
    "Change Game Mode",
    "change-game-mode",
  );
  const exitButton = createGameOverButton("Main Menu", "exit-main-menu");

  appendChildren(actions, rematchButton, changeModeButton, exitButton);
  appendChildren(panel, title, winnerText, actions);
  appendChildren(overlay, panel);

  gameScreen.appendChild(overlay);
}

function createGameOverButton(label, action) {
  const button = createEl("button", null, "game-over-button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;

  return button;
}
