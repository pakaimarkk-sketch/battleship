export const classicShipDefinitions = [
  {
    id: "carrier",
    name: "Carrier",
    size: 5,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ],
  },
  {
    id: "battleship",
    name: "Battleship",
    size: 4,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  },
  {
    id: "cruiser",
    name: "Cruiser",
    size: 3,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  },
  {
    id: "submarine",
    name: "Submarine",
    size: 3,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  },
  {
    id: "destroyer",
    name: "Destroyer",
    size: 2,
    shape: [
      [0, 0],
      [1, 0],
    ],
  },
];

export const modernShipDefinitions = [
  ...classicShipDefinitions,

  {
    id: "l_shape",
    name: "L Shape",
    size: 4,
    shape: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
  },

  {
    id: "reversed_l_shape",
    name: "Reversed L Shape",
    size: 4,
    shape: [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
  },

  {
    id: "cross",
    name: "Cross",
    size: 6,
    shape: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [0, 2],
      [2, 2],
    ],
  },

  {
    id: "t_shape",
    name: "T Shape",
    size: 5,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
  },

  {
    id: "long_ship",
    name: "Long Ship",
    size: 8,
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ],
  },
];
