import { classicShipDefinitions } from "../ships/shipDefinitions.js";

export const classicConfig = {
  mode: "classic",

  board: {
    size: 10,
  },

  ships: classicShipDefinitions,

  abilities: {
    enabled: false,
  },

  rules: {
    allowAdjacentShips: true,
    allowRepeatedAttacks: false,
    winCondition: "sinkAllShips",
    extraTurnOnHit: true,
  },
};
