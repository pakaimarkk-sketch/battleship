# 03 Architecture

## 1. Architecture Goal

The goal of the architecture is to keep the Battleship project modular, scalable, and easy to extend with additional game modes, player modes, UI screens, and future features.

The project should separate core gameplay logic from UI logic, configuration, and persistence.  
The architecture should make it possible to build a playable classic version first, while still leaving room for modern mode, custom mode, statistics, settings, themes, audio, and future multiplayer support.

---

## 2. High-Level System Overview

The project is organized into several main layers:

- **App Layer**  
  Controls application flow, screen changes, and navigation between major sections of the app.

- **Game Layer**  
  Contains the main Battleship logic, including board state, ships, match flow, player participation, and setup flow.

- **Config Layer**  
  Stores preset configurations, difficulty settings, ship definitions, and ability definitions.

- **UI Layer**  
  Handles static layouts, dynamic rendering, and user interactions.

- **Features Layer**  
  Contains additional product systems such as settings, statistics, audio, and themes.

- **Storage Layer**  
  Handles local persistence such as saved settings and stored statistics.

- **Utils Layer**  
  Contains shared helper functions such as DOM helpers and generic utilities.

---

## 3. Main Modules

### App

The app layer coordinates the overall application flow.
It is responsible for:

- app startup
- screen switching
- navigation between menu sections
- connecting UI flow with game setup flow

Main files:

- `appController.js`
- `screenController.js`
- `navigationController.js`

### Game

The game layer contains the main Battleship domain logic.

It includes:

- board logic
- ship logic
- game flow
- player participation
- bot decision logic
- setup flow
- game mode definitions

Main folders:

- `game/core`
- `game/modes`
- `game/participants`
- `game/setup`

### Config

The config layer defines reusable game data and preset configurations.

It includes:

- classic preset
- modern preset
- bot difficulty configs
- ship definitions
- ability definitions

### UI

The UI layer is split into:

- **layout** for static screen structure
- **renderer** for dynamic content updates
- **actions** for event listeners and interaction bindings

### Features

The features layer contains systems that support the product but are not part of the core Battleship rules.

It includes:

- settings
- statistics
- audio
- themes

### Storage

The storage layer handles persistence with local storage in the first phase.

### Utils

The utils layer contains shared helper functions and reusable utilities.

---

## 4. Core Gameplay Flow

The main gameplay flow is designed around a session-based structure.

High-level flow:

1. The player chooses a player mode.
2. The player chooses a game mode.
3. The required setup is created from configuration.
4. A game session is initialized.
5. Boards and participants are prepared.
6. Ship placement phase begins.
7. Battle phase begins.
8. Turns alternate between participants.
9. Attacks are resolved on the target board.
10. The game checks whether a win condition has been reached.
11. The match ends and results can be passed to statistics and UI systems.

The `gameboard` is responsible only for board-level state and actions.  
The match flow itself should be handled by a higher-level controller or session structure.

---

## 5. Player Mode Architecture

Player modes define who is playing and how the session behaves.

### SinglePlayer

- Human player vs bot
- Requires bot logic
- Requires selected difficulty
- Uses the same core gameplay rules as other modes

### Local

- Human player vs human player on the same device
- Requires turn handoff flow
- Uses the same core gameplay rules as other modes

### Multiplayer

- Planned for later phase
- Will require networking, lobby flow, synchronized game state, and online session handling
- Should not be tightly coupled to the first implementation of the local game logic

Player modes should be handled at session/app level, not inside the `gameboard`.

---

## 6. Game Mode Architecture

Game modes define the rule set of the match.

### Classic

A fixed preset with standard Battleship rules:

- 10x10 board
- 5 ships

### Modern

A larger preset with expanded rules:

- 20x20 board
- 10 ships
- special ship shapes
- abilities
- cooldown and unlock rules

### Custom

A configurable rule set where the player selects values within defined limits.

The architecture should treat game modes as configuration presets rather than completely separate game implementations.

This means:

- `Classic` and `Modern` are predefined configurations
- `Custom` builds a configuration dynamically
- the same core systems should use these configurations

---

## 7. UI Architecture

The UI layer is split into three parts:

### Layout

Responsible for static structure:

- screen containers
- sections
- panels
- placeholders for dynamic content

Examples:

- `menuLayout.js`
- `gameLayout.js`

### Renderer

Responsible for dynamic UI updates:

- menu content
- board rendering
- game status
- settings data
- statistics data

Examples:

- `menuRenderer.js`
- `gameRenderer.js`
- `boardRenderer.js`
- `settingsRenderer.js`
- `statisticsRenderer.js`

### Actions

Responsible for event binding and user interaction:

- menu button events
- game board interactions
- settings controls
- setup actions

Examples:

- `menuActions.js`
- `gameActions.js`
- `settingsActions.js`

The UI layer should not contain the core game rules directly.  
It should read state and trigger actions through controllers and game systems.

---

## 8. State and Data Flow

The project should keep state responsibilities separated.

### App State

Handles:

- current screen
- navigation state
- selected menu flow
- current setup step

### Game Session State

Handles:

- selected player mode
- selected game mode
- current turn
- phase of the game
- round count
- winner / game over status

### Board State

Handled by the `gameboard`:

- board size
- occupied cells
- hits
- misses
- placed ships

### Feature State

Handled by feature systems:

- settings state
- statistics state
- theme state
- audio state

The UI should render based on state, while changes to state should happen through dedicated controllers, game systems, or feature systems.

---

## 9. Configuration Strategy

The project should use configuration-driven design wherever possible.

Configuration should define:

- board size
- ship count
- ship types
- special shapes
- ability availability
- cooldown values
- unlock rules
- bot behavior parameters

This makes it easier to:

- add new presets
- support custom mode
- tune difficulty
- avoid hardcoded rule duplication

Classic and modern modes should use predefined config objects.  
Custom mode should generate a valid config object based on user-selected options.

---

## 10. Persistence Strategy

In the first phase, persistence should use local storage.

Primary persistence targets:

- settings
- statistics
- saved user preferences

Persistence logic should be separated from the core gameplay logic.  
The game systems should not directly depend on storage implementation details.

A later backend integration can replace or extend the storage layer without requiring a rewrite of the core game systems.

---

## 11. Expansion Strategy

The architecture should leave room for future expansion.

Planned expansion areas:

- multiplayer
- lobby system
- advanced themes
- richer audio system
- more abilities
- more ship presets
- possibly backend-based persistence

Expansion should happen by adding new configurations, feature modules, or app flow systems rather than rewriting the core gameplay foundation.

---

## 12. Risks / Complexity Notes

### Risk: oversized game controller

If too much match flow is placed into a single `matchController`, it may become difficult to maintain.
This risk can be reduced by separating board logic, validation, turn handling, and setup responsibilities.

### Risk: UI logic mixed with game logic

If renderers or action files start making game-rule decisions directly, the project may become tightly coupled and harder to scale.

### Risk: premature over-modularization

Too many files too early can slow development.
The structure should stay modular, but not every planned file needs full implementation immediately.

### Risk: multiplayer complexity

Multiplayer is not just another player mode. It introduces networking, synchronization, and session management complexity.

### Risk: custom mode validation

Custom mode adds flexibility, but it also increases the need for strong validation rules and configuration safety.
