import { renderAttackTile } from "../renderer/gameRenderer.js";
import { renderGameOverPanel } from "../renderer/gameOverRenderer.js";
import { getAbilityById } from "../../game/abilities/abilityRegistry.js";

let selectedAbility = null;

export function bindGameActions(controller) {
  bindAbilityButtons();
  bindEnemyBoard(controller);
}

function bindAbilityButtons() {
  const buttons = document.querySelectorAll("[data-ability-id]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const abilityId = button.dataset.abilityId;

      selectedAbility = selectedAbility === abilityId ? null : abilityId;

      updateAbilityButtonUI();
    });
  });
}

function bindEnemyBoard(controller) {
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

  if (selectedAbility) {
    handleAbilityTileClick(controller, selectedAbility, x, y);
    return;
  }

  handleNormalAttackTileClick(controller, x, y);
}

function handleNormalAttackTileClick(controller, x, y) {
  const result = controller.submitAttack("playerOne", x, y);

  renderAttackTile({
    owner: "playerTwo",
    board: controller.match.players.playerTwo.board,
    x,
    y,
    isEnemyBoard: true,
    controller,
  });

  if (result?.attack?.result === "already-attacked") {
    return;
  }

  if (controller.getState().phase === "gameOver") {
    renderGameOverPanel(controller);
    return;
  }

  handleBotTurns(controller);
}

function handleAbilityTileClick(controller, abilityId, x, y) {
  const ability = getAbilityById(abilityId);

  const result = controller.submitAbility("playerOne", ability, x, y);

  selectedAbility = null;
  updateAbilityButtonUI();

  if (!result.success) {
    console.log("Invalid ability use:", result.reason);
    return;
  }

  renderAbilityResult(controller, result);

  if (controller.getState().phase === "gameOver") {
    renderGameOverPanel(controller);
    return;
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

function updateAbilityButtonUI() {
  document.querySelectorAll("[data-ability-id]").forEach((button) => {
    button.classList.toggle(
      "selected",
      button.dataset.abilityId === selectedAbility,
    );
  });
}

function renderAbilityResult(controller, result) {
  if (result.effectType === "scanArea") {
    renderScanResult(result);
    return;
  }

  result.results.forEach((tileResult) => {
    renderAttackTile({
      owner: "playerTwo",
      board: controller.match.players.playerTwo.board,
      x: tileResult.x,
      y: tileResult.y,
      isEnemyBoard: true,
      controller,
    });
  });
}

function renderScanResult(result) {
  result.results.forEach(({ x, y, result: scanResult }) => {
    const tile = document.querySelector(
      `.tile[data-owner="playerTwo"][data-x="${x}"][data-y="${y}"]`,
    );

    if (!tile) return;

    tile.classList.remove("scan-hit", "scan-empty");

    if (scanResult === "ship-present") {
      tile.classList.add("scan-hit");
      return;
    }

    tile.classList.add("scan-empty");
  });
}
