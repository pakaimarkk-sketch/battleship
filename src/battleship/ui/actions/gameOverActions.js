export function bindGameOverActions({ onRematch, onExit, onChangeGameMode }) {
  const gameScreen = document.querySelector(".game-screen");

  if (!gameScreen) return;

  gameScreen.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    if (action === "rematch") {
      onRematch();
      return;
    }

    if (action === "change-game-mode") {
      onChangeGameMode();
      return;
    }

    if (action === "exit-main-menu") {
      onExit();
    }
  });
}
