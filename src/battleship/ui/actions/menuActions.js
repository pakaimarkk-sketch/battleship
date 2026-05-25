// src/battleship/ui/actions/menuActions.js

export function bindMenuActions({ showScreen }) {
  document
    .querySelector("[data-action='open-mode-select']")
    ?.addEventListener("click", () => {
      showScreen("modeSelect");
    });

  document
    .querySelector("[data-action='open-statistics']")
    ?.addEventListener("click", () => {
      showScreen("statistics");
    });

  document
    .querySelector("[data-action='open-settings']")
    ?.addEventListener("click", () => {
      showScreen("settings");
    });

  document
    .querySelector("[data-action='open-about']")
    ?.addEventListener("click", () => {
      showScreen("about");
    });

  document
    .querySelector("[data-action='back-main-menu']")
    ?.addEventListener("click", () => {
      showScreen("mainMenu");
    });
}
