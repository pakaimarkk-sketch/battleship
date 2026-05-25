import { createMatch } from "../game/setup/createMatch.js";
import MatchController from "../game/core/matchController.js";

import { showScreen } from "./screenController.js";

let currentConfig = null;
let currentController = null;

export function startMatch(config) {
  currentConfig = config;

  const match = createMatch(config);
  currentController = new MatchController(match);

  showScreen("game");
}

export function restartMatch() {
  if (!currentConfig) {
    throw new Error("Cannot restart match without config");
  }

  startMatch(currentConfig);
}

export function exitToMainMenu() {
  currentController = null;
  showScreen("mainMenu");
}

export function changeGameMode() {
  currentController = null;
  showScreen("modeSelect");
}

export function getCurrentController() {
  return currentController;
}

export function getCurrentConfig() {
  return currentConfig;
}
