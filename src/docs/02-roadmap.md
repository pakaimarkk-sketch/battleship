# 02 Roadmap

## Roadmap Goal

The roadmap defines the planned implementation order of the Battleship project.
Its purpose is to build a stable and scalable foundation first, then expand the project into a more complete product.

The roadmap follows these principles:

- core systems come before expansion systems
- match flow comes before advanced content
- UI should support the game systems, not define them
- future features should be prepared for early, but implemented only after the foundation is stable

---

## Phase 0 — Project Setup and Architecture Foundation

### Goal

Prepare the project structure, documentation, and module boundaries before core implementation begins.

### Main Tasks

- create the initial folder structure ✅
- define the main module boundaries ✅
- prepare architecture documentation ✅
- prepare roadmap documentation ✅
- define naming conventions for modules and controllers ✅
- establish config-driven direction for game modes ✅
- prepare reusable utility structure ✅

### Expected Outcome

The project has a stable development structure and a clear architectural direction.

---

## Phase 1 — Core Board and Ship Systems

### Goal

Build the lowest-level Battleship systems that represent the board and ships.

### Main Tasks

- implement `ship.js` ✅
- implement `gameboard.js` ✅
- support board creation ✅
- support ship placement rules ✅
- support placement validation ✅
- support hit / miss registration ✅
- support sunk ship detection ✅
- define ship definitions through configuration where possible ✅

### Expected Outcome

The project can represent a valid Battleship board state and apply attacks correctly at board level.

### Dependencies

- architecture foundation
- ship definitions
- validators for placement rules

---

## Phase 2 — Match Flow and Win Conditions

### Goal

Build the system that coordinates a full match.

### Main Tasks

- implement `matchController.js` ✅
- define match phases
  - setup phase
  - placement phase
  - battle phase
  - end phase
- implement turn switching
- implement attack resolution flow through match logic
- connect participants to their boards ✅
- implement winner detection ✅
- define game over handling
- define round tracking for future advanced modes

### Expected Outcome

A complete match can run from setup to victory using core rules.

### Dependencies

- board logic
- ship logic
- win condition logic
- player structure

---

## Phase 3 — Playable Classic Mode

### Goal

Deliver the first fully playable version of the game using classic Battleship rules.

### Main Tasks

- implement `classicConfig.js` ✅
- connect classic preset to the match setup flow ✅
- create a valid classic ship set ✅
- support player board setup for classic mode
- support a playable battle loop
- ensure classic rules work end to end
- validate that the core game can be completed from start to finish

### Expected Outcome

A full classic Battleship match can be played using the project’s core systems.

### Dependencies

- board and ship systems
- match flow
- classic preset configuration

---

## Phase 4 — Bot Integration and Difficulty Support

### Goal

Add singleplayer support with bot behavior and difficulty scaling.

### Main Tasks

- implement `computerLogic.js` ✅
- connect bot behavior to singleplayer flow
- implement `easyBotConfig.js` ✅
- implement `mediumBotConfig.js`
- implement `hardBotConfig.js`
- support bot ship placement ✅
- support bot attack decisions ✅
- define how difficulty changes bot behavior ✅
- integrate difficulty selection into game setup

### Expected Outcome

Singleplayer works with selectable difficulty levels and bot-controlled turns.

### Dependencies

- match flow
- classic playable foundation
- participant model
- difficulty configuration

---

## Phase 5 — Menu, Navigation, and Setup Flow

### Goal

Build the application flow around the playable game systems.

### Main Tasks

- implement main menu flow
- implement opener flow if retained
- implement play navigation
- implement mode selection flow
- implement difficulty selection flow
- implement setup screens
- connect selected setup values to config generation
- integrate `screenController.js`
- integrate `navigationController.js` if kept separate
- connect UI actions to match creation

### Expected Outcome

The user can navigate through the application and start a match through a structured menu/setup flow.

### Dependencies

- playable classic mode
- bot integration
- UI layout and renderer foundation

---

## Phase 6 — Settings, Statistics, and Product Support Systems

### Goal

Add support systems that make the game feel like a fuller product.

### Main Tasks

- implement settings system
- implement settings persistence
- implement statistics tracking
- implement statistics persistence
- define result recording from finished matches
- create settings screen
- create statistics screen
- connect stored values to UI rendering
- prepare theme registry structure
- prepare audio control structure

### Expected Outcome

The project supports persistent settings and stored match statistics.

### Dependencies

- completed match flow
- menu/navigation flow
- storage layer

---

## Phase 7 — Modern Mode and Custom Mode Expansion

### Goal

Expand the game rules beyond classic Battleship using the existing config-driven architecture.

### Main Tasks

- implement `modernConfig.js` ✅
- implement ability definitions
- implement special ship definitions ✅
- support larger board sizes ✅
- support special ship shapes ✅
- support ability rules
- support unlock and cooldown behavior
- implement `customSetup.js`
- support custom mode validation
- generate valid custom configs from user choices

### Expected Outcome

The architecture supports expanded and configurable game modes without rewriting the core foundation.

### Dependencies

- stable classic foundation
- match controller round handling
- config-driven rule system
- validation layer

---

## Phase 8 — Audio, Themes, and Visual Polish

### Goal

Improve presentation and customization without altering the core game foundation.

### Main Tasks

- implement audio system
- support sound effects
- support music
- support audio settings
- implement theme registry
- support multiple board/ship visual styles
- connect themes to UI rendering
- improve feedback and polish in the game screen

### Expected Outcome

The game has stronger presentation quality and optional customization systems.

### Dependencies

- settings system
- UI renderer structure
- theme/audio feature modules

---

### Phase 9 — Online Multiplayer Planning and Future Expansion

### Goal

Define the long-term online multiplayer direction as a separate system built on top of the finished core game foundation.

### Main Tasks

- define online match expectations
- define whether the system supports ranked, casual, or both
- define ELO / rating goals
- define result tracking requirements
- evaluate Find Match flow for ranked play
- evaluate Private Lobby / Room Code flow for friend matches
- define what identity/profile system would be required
- define how online match state would be synchronized
- isolate networking concerns from local match logic
- Expected Outcome

The project has a clear product and technical direction for a future online multiplayer system.

---

## Build Order Summary

1. project setup and architecture foundation
2. board and ship systems
3. match flow and win conditions
4. playable classic mode
5. bot integration and difficulty support
6. menu, navigation, and setup flow
7. settings, statistics, and product systems
8. modern/custom expansion
9. audio, themes, and visual polish
10. multiplayer groundwork or future expansion

---

## Delivery Logic

The roadmap is intentionally staged so that:

- the core game becomes playable early
- advanced rule systems are added on top of a stable base
- product support systems are added after gameplay is functional
- multiplayer is treated as a separate high-complexity expansion rather than being mixed into the early core implementation

---

## Notes

This roadmap is a planning tool, not a rigid contract.
The order may be adjusted during implementation if new technical constraints or better system boundaries are discovered.
