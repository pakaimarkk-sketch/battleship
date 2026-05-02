export function createCustomConfig(options) {
  return {
    name: "custom",
    board: {
      size: options.boardSize,
    },
    ships: options.ships,
    rules: options.rules,
    abilities: options.abilities ?? [],
    placement: options.placement,
  };
}
