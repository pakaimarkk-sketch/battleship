import Ship from "../core/ship.js";

export function placePresetFleet(board, ships, placement) {
  if (placement.type !== "preset") {
    return;
  }

  ships.forEach((shipDefinition, index) => {
    const position = placement.positions[index];

    if (!position) {
      throw new Error(`Missing preset position for ship: ${shipDefinition.id}`);
    }

    const ship = new Ship(shipDefinition);

    const result = board.placeShip(
      ship,
      position.x,
      position.y,
      position.rotation,
    );

    if (!result.success) {
      throw new Error(
        `Failed to place ship "${shipDefinition.id}": ${result.reason}`,
      );
    }
  });
}
