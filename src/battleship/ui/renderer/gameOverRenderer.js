import {
  createEl,
  createDiv,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function renderGameOverPanel(controller) {
  const state = controller.getState();

  if (state.phase !== "gameOver") return;

  const panel = document.querySelector(".game-status");

  if (!panel) return;

  panel.textContent = "";

  const wrapper = createDiv(null, "game-over-panel");

  const title = createTextElement("h2", null, "game-over-title", "Game Over");

  const winnerText = createTextElement(
    "p",
    null,
    "game-over-winner",
    `${state.winner} wins!`,
  );

  const actions = createDiv(null, "game-over-actions");

  const rematchButton = createEl("button", null, "game-over-button");
  rematchButton.textContent = "Rematch";
  rematchButton.dataset.action = "rematch";

  const exitButton = createEl("button", null, "game-over-button");
  exitButton.textContent = "Exit";
  exitButton.dataset.action = "exit";

  const changeModeButton = createEl("button", null, "game-over-button");
  changeModeButton.textContent = "Change game mode";
  changeModeButton.dataset.action = "change-game-mode";

  appendChildren(actions, rematchButton, exitButton, changeModeButton);
  appendChildren(wrapper, title, winnerText, actions);

  panel.appendChild(wrapper);
}
