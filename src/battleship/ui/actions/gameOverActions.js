export function bindGameOverActions({ onRematch, onExit, onChangeGameMode }) {
  const panel = document.querySelector(".game-status");

  if (!panel) return;

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    if (action === "rematch") {
      onRematch?.();
    }

    if (action === "exit") {
      onExit?.();
    }

    if (action === "change-game-mode") {
      onChangeGameMode?.();
    }
  });
}
