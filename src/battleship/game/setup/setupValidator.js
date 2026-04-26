import { classicConfig } from "../config/presets/classicConfig";
import { easyDifficulty } from "../config/bot/botConfig";
import { mediumDifficulty } from "../config/bot/mediumBotConfig";
import { hardDifficulty } from "../config/bot/hardBotConfig";

const difficulties = {
  easy: easyDifficulty,
  medium: mediumDifficulty,
  hard: hardDifficulty,
};

const presets = {
  classic: classicConfig,
};

export function createMatchConfig({ mode, playerMode, difficulty }) {
  const preset = presets[mode];

  if (!preset) {
    throw new Error(`Unknown mode: ${mode}`);
  }

  const difficultyConfig =
    playerMode === "singlePlayer" ? difficulties[difficulty] : {};

  return {
    ...preset,
    ...difficultyConfig,
    playerMode,
  };
}
