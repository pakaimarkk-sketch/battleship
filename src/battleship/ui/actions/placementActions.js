import { renderBoard } from "../renderer/boardRenderer.js";

export function bindPlacementActions(controller) {
  const playerBoard = document.querySelector('[data-owner="playerOne"].board');

  if (!playerBoard) return;

  playerBoard.addEventListener("click", (event) => {
    const tile = event.target.closest(".tile");

    if (!tile) return;

    const x = Number(tile.dataset.x);
    const y = Number(tile.dataset.y);

    const result = controller.placePlayerOneShip(x, y);

    if (!result.success) {
      console.log("Invalid placement:", result.reason);
      return;
    }

    renderBoard({
      owner: "playerOne",
      board: controller.match.players.playerOne.board,
      isEnemyBoard: false,
      controller,
    });

    if (result.complete) {
      console.log("Placement complete. Game started.");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "r") return;

    controller.rotatePlayerOneShip();
  });
}
