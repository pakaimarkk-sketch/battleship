import EasyBotLogic from "./easyBotLogic";

export function createBotLogic(difficulty) {
  const botLogics = {
    easy: EasyBotLogic,
    medium: MediumBotLogic,
    hard: HardBotLogic,
  };

  const BotLogic = botLogics[difficulty];

  return new BotLogic();
}
