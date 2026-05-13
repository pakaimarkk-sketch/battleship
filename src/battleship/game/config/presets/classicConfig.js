import { classicShipDefinitions } from "../ships/shipDefinitions.js";

export const classicConfig = {
  mode: "classic",

  board: {
    size: 10,
  },

  ships: classicShipDefinitions,

  placement: {
    type: "preset",
    positions: [
      { x: 0, y: 0, rotation: 0 },
      { x: 0, y: 2, rotation: 0 },
      { x: 0, y: 4, rotation: 0 },
      { x: 0, y: 6, rotation: 0 },
      { x: 0, y: 8, rotation: 0 },
    ],
  },

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
