import { appState } from "./appState.js";

import {
  getCurrentController,
  restartMatch,
  exitToMainMenu,
  changeGameMode,
} from "./appController.js";

import { createMenuLayout } from "../ui/layout/menuLayout.js";
import { createModeSelectLayout } from "../ui/layout/modeSelectLayout.js";
import { createSetupLayout } from "../ui/layout/setupLayout.js";
import { createGameLayout } from "../ui/layout/gameLayout.js";
import { createInfoLayout } from "../ui/layout/infoLayout.js";

import { bindMenuActions } from "../ui/actions/menuActions.js";
import { bindModeSelectActions } from "../ui/actions/modeSelectActions.js";
import { bindSetupActions } from "../ui/actions/setupActions.js";
import { bindPlacementActions } from "../ui/actions/placementActions.js";
import { bindGameActions } from "../ui/actions/gameActions.js";
import { bindGameOverActions } from "../ui/actions/gameOverActions.js";

import { renderInitialGame } from "../ui/renderer/gameRenderer.js";
import { renderSetup } from "../ui/renderer/setupRenderer.js";

const views = {
  mainMenu: {
    create: () =>
      createMenuLayout({
        title: "Battleship",
        subtitle: "Command your fleet.",
        buttons: [
          { label: "Play", action: "open-mode-select" },
          { label: "Statistics", action: "open-statistics" },
          { label: "Settings", action: "open-settings" },
          { label: "About Game", action: "open-about" },
        ],
      }),

    bind: () => {
      bindMenuActions({ showScreen });
    },

    render: () => {},
  },

  modeSelect: {
    create: () => createModeSelectLayout(),

    bind: () => {
      bindModeSelectActions({ appState, showScreen });
    },

    render: () => {},
  },

  setup: {
    create: () => createSetupLayout(appState.setup),

    bind: () => {
      bindSetupActions({ appState, showScreen });
    },

    render: () => {
      renderSetup(appState.setup);
    },
  },

  game: {
    create: () => createGameLayout(getCurrentController()),

    bind: () => {
      const controller = getCurrentController();

      bindPlacementActions(controller);
      bindGameActions(controller);

      bindGameOverActions({
        onRematch: restartMatch,
        onExit: exitToMainMenu,
        onChangeGameMode: changeGameMode,
      });
    },

    render: () => {
      renderInitialGame(getCurrentController());
    },
  },

  statistics: {
    create: () =>
      createInfoLayout({
        title: "Statistics",
        text: "Statistics will be available later.",
        backAction: "back-main-menu",
      }),

    bind: () => {
      bindMenuActions({ showScreen });
    },

    render: () => {},
  },

  settings: {
    create: () =>
      createInfoLayout({
        title: "Settings",
        text: "Settings will be available later.",
        backAction: "back-main-menu",
      }),

    bind: () => {
      bindMenuActions({ showScreen });
    },

    render: () => {},
  },

  about: {
    create: () =>
      createInfoLayout({
        title: "About Game",
        text: "Battleship is a turn-based strategy game about placing ships and sinking the enemy fleet.",
        backAction: "back-main-menu",
      }),

    bind: () => {
      bindMenuActions({ showScreen });
    },

    render: () => {},
  },
};

export function showScreen(screenName) {
  const view = views[screenName];

  if (!view) {
    throw new Error(`Unknown screen: ${screenName}`);
  }

  appState.currentScreen = screenName;
  updateUI();
}

export function initScreenController() {
  updateUI();
}

function updateUI() {
  const app = document.querySelector("#app");
  const view = views[appState.currentScreen];

  if (!app || !view) return;

  app.innerHTML = "";

  app.appendChild(view.create());
  view.bind();
  view.render();
}
