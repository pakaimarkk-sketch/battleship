export function validateConfig(config) {
  if (!config.board?.size) {
    throw new Error("Missing board size");
  }

  if (!Array.isArray(config.ships) || config.ships.length === 0) {
    throw new Error("Missing ships");
  }

  if (!config.rules) {
    throw new Error("Missing rules");
  }

  if (!config.match?.playerMode) {
    throw new Error("Missing player mode");
  }

  return true;
}
