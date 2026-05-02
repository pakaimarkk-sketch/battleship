import { classicConfig } from "../config/presets/classicConfig.js";
import { modernConfig } from "../config/presets/modernConfig.js";
import { createCustomConfig } from "../config/custom/createCustomConfig.js";
import { validateConfig } from "./validateConfig.js";

const presetConfigs = {
  classic: classicConfig,
  modern: modernConfig,
};

export function buildMatchConfig(selection) {
  const baseConfig =
    selection.gameMode === GAME_MODES.CUSTOM
      ? createCustomConfig(selection.customOptions)
      : presetConfigs[selection.gameMode];

  if (!baseConfig) {
    throw new Error(`Unknown config source: ${selection.presetName}`);
  }

  const matchConfig = {
    ...baseConfig,
    match: {
      playerMode: selection.playerMode,
      difficulty: selection.difficulty ?? null,
    },
  };

  validateConfig(matchConfig);

  return matchConfig;
}
