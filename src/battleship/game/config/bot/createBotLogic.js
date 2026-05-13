import EasyBotLogic from "./easyBotLogic";
import MediumBotLogic from "./mediumBotLogic";
import HardBotLogic from "./hardBotLogic";

export function createBotLogic(difficulty) {
  const botLogics = {
    easy: EasyBotLogic,
    medium: MediumBotLogic,
    hard: HardBotLogic,
  };

  const BotLogic = botLogics[difficulty];

  return new BotLogic();
}
