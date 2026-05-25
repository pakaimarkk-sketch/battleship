import {
  createEl,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function createSetupLayout(setup) {
  const screen = createEl("main", null, "menu-screen");

  const panel = createEl("section", null, "menu-panel", "setup-panel");

  const title = createTextElement("h1", "Game Setup", null, "menu-title");
  const subtitle = createTextElement(
    "p",
    "Choose player mode and difficulty.",
    null,
    "menu-subtitle",
  );

  const form = createEl("div", null, "setup-form");

  const playerModeGroup = createOptionGroup({
    title: "Player Mode",
    action: "select-player-mode",
    currentValue: setup.playerMode,
    options: [
      { label: "Single Player", value: "singlePlayer" },
      { label: "Local Player", value: "local" },
      { label: "Multiplayer", value: "multiplayer", disabled: true },
    ],
  });

  const difficultyGroup = createOptionGroup({
    title: "Bot Difficulty",
    action: "select-difficulty",
    currentValue: setup.difficulty,
    options: [
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
    ],
  });

  const startButton = createEl("button", null, "menu-button");
  startButton.type = "button";
  startButton.textContent = "Start Game";
  startButton.dataset.action = "start-game";

  const backButton = createEl(
    "button",
    null,
    "menu-button",
    "menu-button-secondary",
  );
  backButton.type = "button";
  backButton.textContent = "Back";
  backButton.dataset.action = "back-mode-select";

  appendChildren(
    form,
    playerModeGroup,
    difficultyGroup,
    startButton,
    backButton,
  );
  appendChildren(panel, title, subtitle, form);

  return appendChildren(screen, panel);
}

function createOptionGroup({ title, action, currentValue, options }) {
  const group = createEl("section", null, "setup-option-group");

  const heading = createTextElement("h2", title, null, "setup-option-title");
  const buttons = createEl("div", null, "setup-option-buttons");

  options.forEach(({ label, value, disabled = false }) => {
    const button = createEl("button", null, "setup-option-button");
    button.type = "button";
    button.textContent = label;
    button.dataset.action = action;
    button.dataset.value = value;

    if (value === currentValue) {
      button.classList.add("selected");
    }

    if (disabled) {
      button.disabled = true;
      button.classList.add("disabled");
    }

    buttons.appendChild(button);
  });

  return appendChildren(group, heading, buttons);
}
