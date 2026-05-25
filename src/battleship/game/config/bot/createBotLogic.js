import EasyBotLogic from "./easyBotLogic.js";
import MediumBotLogic from "./mediumBotLogic.js";
import HardBotLogic from "./hardBotLogic.js";

export function createBotLogic(difficulty = "easy") {
  const botLogics = {
    easy: EasyBotLogic,
    medium: MediumBotLogic,
    hard: HardBotLogic,
  };

  const BotLogic = botLogics[difficulty];

  if (!BotLogic) {
    throw new Error(`Unknown bot difficulty: ${difficulty}`);
  }

  return new BotLogic();
}
