import { buildMatchConfig } from "../../game/setup/buildMatchConfig.js";
import { PLAYER_MODES } from "../../game/modes/playerModes.js";
import { startMatch } from "../../app/appController.js";

export function bindSetupActions({ appState, showScreen }) {
  document
    .querySelectorAll("[data-action='select-player-mode']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.setup.playerMode = getPlayerMode(button.dataset.value);
        showScreen("setup");
      });
    });

  document
    .querySelectorAll("[data-action='select-difficulty']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        appState.setup.difficulty = button.dataset.value;
        showScreen("setup");
      });
    });

  document
    .querySelector("[data-action='start-game']")
    ?.addEventListener("click", () => {
      const config = buildMatchConfig({
        gameMode: appState.setup.gameMode,
        playerMode: appState.setup.playerMode,
        difficulty: appState.setup.difficulty,
      });

      startMatch(config);
    });

  document
    .querySelector("[data-action='back-mode-select']")
    ?.addEventListener("click", () => {
      showScreen("modeSelect");
    });
}

function getPlayerMode(value) {
  const playerModes = {
    singlePlayer: PLAYER_MODES.SINGLE_PLAYER,
    local: PLAYER_MODES.LOCAL,
    multiplayer: PLAYER_MODES.MULTIPLAYER,
  };

  return playerModes[value] ?? PLAYER_MODES.SINGLE_PLAYER;
}
