import {
  createEl,
  createTextElement,
  appendChildren,
} from "../../utils/domHelpers.js";

export function createMenuLayout({ title, subtitle = "", buttons = [] }) {
  const screen = createEl("main", null, "menu-screen");

  const panel = createEl("section", null, "menu-panel");

  const heading = createTextElement("h1", title, null, "menu-title");
  const description = createTextElement("p", subtitle, null, "menu-subtitle");

  const buttonColumn = createEl("div", null, "menu-button-column");

  buttons.forEach(({ label, action }) => {
    const button = createEl("button", null, "menu-button");
    button.type = "button";
    button.textContent = label;
    button.dataset.action = action;

    buttonColumn.appendChild(button);
  });

  appendChildren(panel, heading, description, buttonColumn);
  return appendChildren(screen, panel);
}
