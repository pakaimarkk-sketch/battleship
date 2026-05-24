import {
  createDiv,
  createTextElement,
  appendChildren,
  createButton,
} from "../../utils/domHelpers.js";

export function renderGameOverPanel(controller) {
  const state = controller.getState();

  if (state.phase !== "gameOver") return;

  const panel = document.querySelector(".game-status");

  if (!panel) return;

  panel.textContent = "";

  const wrapper = createDiv(null, "game-over-panel");

  const title = createTextElement("h2", "Game Over", null, "game-over-title");

  const winnerText = createTextElement(
    "p",
    `${state.winner} wins!`,
    null,
    "game-over-winner",
  );

  const actions = createDiv(null, "game-over-actions");

  const rematchButton = createButton("Rematch", null, "game-over-button");
  rematchButton.dataset.action = "rematch";

  const exitButton = createButton("Exit", null, "game-over-button");
  exitButton.dataset.action = "exit";

  const changeModeButton = createButton(
    "Change game mode",
    null,
    "game-over-button",
  );
  changeModeButton.dataset.action = "change-game-mode";

  appendChildren(actions, rematchButton, exitButton, changeModeButton);
  appendChildren(wrapper, title, winnerText, actions);

  panel.appendChild(wrapper);
}
