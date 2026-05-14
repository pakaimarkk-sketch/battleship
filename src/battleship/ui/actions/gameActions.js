import { renderAttackTile } from "../renderer/gameRenderer.js";

export function bindGameActions(controller) {
  const enemyBoard = document.querySelector('[data-owner="playerTwo"].board');

  if (!enemyBoard) return;

  enemyBoard.addEventListener("click", (event) => {
    const tile = event.target.closest(".tile");

    if (!tile) return;

    const x = Number(tile.dataset.x);
    const y = Number(tile.dataset.y);

    handleEnemyTileClick(controller, x, y);
  });
}

function handleEnemyTileClick(controller, x, y) {
  const state = controller.getState();

  if (state.gameOver) return;
  if (state.currentTurn !== "playerOne") return;

  const result = controller.handlePlayerAttack(x, y);

  renderAttackTile({
    owner: "playerTwo",
    board: controller.match.players.playerTwo.board,
    x,
    y,
    isEnemyBoard: true,
    controller,
  });

  if (result?.result === "already-attacked") {
    return;
  }

  handleBotTurns(controller);
}

function handleBotTurns(controller) {
  while (
    !controller.getState().gameOver &&
    controller.getCurrentPlayer()?.isBot()
  ) {
    const botAttack = controller.handleBotTurn();

    if (!botAttack) break;

    renderAttackTile({
      owner: "playerOne",
      board: controller.match.players.playerOne.board,
      x: botAttack.x,
      y: botAttack.y,
      isEnemyBoard: false,
      controller,
    });
  }
}
