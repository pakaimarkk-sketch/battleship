import { renderBoard, updateTile } from "./boardRenderer.js";

export function renderInitialGame(controller) {
  renderStatus(controller);

  renderBoard({
    owner: "playerOne",
    board: controller.match.players.playerOne.board,
    isEnemyBoard: false,
  });

  renderBoard({
    owner: "playerTwo",
    board: controller.match.players.playerTwo.board,
    isEnemyBoard: true,
  });
}

export function renderStatus(controller) {
  const status = document.querySelector('[data-role="game-status"]');

  if (!status) return;

  const state = controller.getState();

  status.textContent = state.gameOver
    ? `Winner: ${state.winner}`
    : `Current turn: ${state.currentTurn}`;
}

export function renderAttackTile({
  owner,
  board,
  x,
  y,
  isEnemyBoard,
  controller,
}) {
  updateTile({
    owner,
    board,
    x,
    y,
    isEnemyBoard,
  });

  renderStatus(controller);
}
