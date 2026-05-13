import { modernShipDefinitions } from "../ships/shipDefinitions";

export const modernConfig = {
  mode: "modern",

  board: {
    size: 20,
  },

  ships: modernShipDefinitions,

  placement: {
    type: "preset",
    positions: [
      { x: 0, y: 0, rotation: 0 },
      { x: 0, y: 2, rotation: 0 },
      { x: 0, y: 4, rotation: 0 },
      { x: 0, y: 6, rotation: 0 },
      { x: 0, y: 8, rotation: 0 },
      { x: 0, y: 10, rotation: 0 },
      { x: 0, y: 12, rotation: 0 },
      { x: 0, y: 14, rotation: 0 },
      { x: 0, y: 16, rotation: 0 },
      { x: 0, y: 18, rotation: 0 },
    ],
  },

  abilities: {
    enabled: true,
  },

  rules: {
    allowAdjacentShips: true,
    allowRepeatedAttacks: false,
    winCondition: "sinkAllShips",
    extraTurnOnHit: true,
  },
};
