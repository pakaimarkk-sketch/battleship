import { renderAttackTile } from "../renderer/gameRenderer.js";
import { renderGameOverPanel } from "../renderer/gameOverRenderer.js";

let selectedAbility = null;

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
  const selectedAbility = getSelectedAbility();

  if (state.gameOver) return;
  if (state.currentTurn !== "playerOne") return;

  const result = controller.submitAttack("playerOne", x, y);

  if (selectedAbility) {
    const result = controller.handlePlayerAbility(selectedAbility, x, y);
    clearSelectedAbility();
    renderAbilityResult(result);
    return;
  }

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

  if (controller.getState().phase === "gameOver") {
    renderGameOverPanel(controller);
  }

  handleBotTurns(controller);
}

function handleBotTurns(controller) {
  while (!controller.getState().gameOver && controller.shouldBotPlay()) {
    const botAttack = controller.submitAutoAttack();

    if (!botAttack) break;

    if (controller.getState().phase === "gameOver") {
      renderGameOverPanel(controller);
    }

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

function handleAbilityButtonClick(e) {
  const abilityId = e.target.dataset.abilityId;

  if (!abilityId) return;

  selectedAbility = abilityId;
}

function handleAbilityButtonClick(e) {
  const abilityId = e.target.dataset.abilityId;

  if (!abilityId) return;

  selectedAbility = abilityId;

  document.querySelectorAll(".ability-btn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.abilityId === abilityId);
  });
}
