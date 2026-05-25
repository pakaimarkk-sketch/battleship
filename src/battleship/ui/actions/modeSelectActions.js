import { GAME_MODES } from "../../game/modes/gameModes.js";

export function bindModeSelectActions({ appState, showScreen }) {
  document
    .querySelectorAll("[data-action='select-game-mode']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.setup.gameMode = getGameMode(button.dataset.mode);
        showScreen("setup");
      });
    });

  document
    .querySelector("[data-action='back-main-menu']")
    ?.addEventListener("click", () => {
      showScreen("mainMenu");
    });
}

function getGameMode(mode) {
  const modes = {
    classic: GAME_MODES.CLASSIC,
    modern: GAME_MODES.MODERN,
    custom: GAME_MODES.CUSTOM,
  };

  return modes[mode] ?? GAME_MODES.CLASSIC;
}
