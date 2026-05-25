import { GAME_MODES } from "../game/modes/gameModes.js";
import { PLAYER_MODES } from "../game/modes/playerModes.js";

export const appState = {
  currentScreen: "mainMenu",

  setup: {
    gameMode: GAME_MODES.CLASSIC,
    playerMode: PLAYER_MODES.SINGLE_PLAYER,
    difficulty: "easy",
  },
};
