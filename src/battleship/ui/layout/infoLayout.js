import {
  createEl,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function createInfoLayout({ title, text, backAction }) {
  const screen = createEl("main", null, "menu-screen");

  const panel = createEl("section", null, "menu-panel");

  const heading = createTextElement("h1", title, null, "menu-title");
  const paragraph = createTextElement("p", text, null, "menu-subtitle");

  const backButton = createEl(
    "button",
    null,
    "menu-button",
    "menu-button-secondary",
  );
  backButton.type = "button";
  backButton.textContent = "Back";
  backButton.dataset.action = backAction;

  appendChildren(panel, heading, paragraph, backButton);

  return appendChildren(screen, panel);
}
