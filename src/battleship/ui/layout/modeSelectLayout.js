import {
  createEl,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function createModeSelectLayout() {
  const screen = createEl("main", null, "menu-screen");

  const panel = createEl("section", null, "menu-panel");

  const title = createTextElement("h1", "Select Game Mode", null, "menu-title");
  const subtitle = createTextElement(
    "p",
    "Choose the ruleset you want to play.",
    null,
    "menu-subtitle",
  );

  const buttons = createEl("div", null, "menu-button-column");

  const classicButton = createModeButton("Classic", "classic");
  const modernButton = createModeButton("Modern", "modern");
  const customButton = createModeButton("Custom", "custom");
  const backButton = createBackButton();

  appendChildren(
    buttons,
    classicButton,
    modernButton,
    customButton,
    backButton,
  );
  appendChildren(panel, title, subtitle, buttons);

  return appendChildren(screen, panel);
}

function createModeButton(label, mode) {
  const button = createEl("button", null, "menu-button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = "select-game-mode";
  button.dataset.mode = mode;

  return button;
}

function createBackButton() {
  const button = createEl(
    "button",
    null,
    "menu-button",
    "menu-button-secondary",
  );
  button.type = "button";
  button.textContent = "Back";
  button.dataset.action = "back-main-menu";

  return button;
}
