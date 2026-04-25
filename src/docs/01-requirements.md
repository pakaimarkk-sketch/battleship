# 01 Requirements

## Project Goal

The client wants a Battleship game that supports multiple player modes, multiple game modes, and future feature expansion.
The project should be documented from planning to implementation as if it were a real freelance client delivery.

---

## Core Requirements

### Player Modes

- SinglePlayer
- Local
- Multiplayer (planned for later phase)

### Game Modes

- Classic
- Modern
- Custom

### Menu System

- Opener
- Main Menu
  - Play
  - Statistics
  - Settings
  - About Game

---

## Functional Requirements

### SinglePlayer

- The player can choose a difficulty:
  - Easy
  - Medium
  - Hard
- The player can choose a game mode:
  - Classic
  - Modern
  - Custom

### Local

- Two local players can play on the same device
- The player can choose a game mode:
  - Classic
  - Modern
  - Custom

### Multiplayer (Future Scope)

- Create lobby
- Choose game mode
- Set lobby visibility:
  - Public
  - Private / code only
- Join lobby:
  - From lobby list
  - By entering code

---

## Game Mode Requirements

### Classic

- 10x10 board
- 5 ships

### Modern

- 20x20 board
- 10 ships
- Special ship shapes:
  - L shape
  - Reversed L
  - Cross
  - T shape
  - 8-length ship
- Abilities:
  - Only one active at a time
  - Unlocked after 5 rounds
  - 5 round cooldown
- Possible abilities:
  - Break fog
  - Line carpet bomb
  - 4x4 patterned carpet bomb

### Custom

Everything should be configurable within limits:

- Board size:
  - 10
  - 15
  - 20
  - 25
  - 30
- Ship count:
  - 5
  - 10
  - 15
  - 20
- Ship types:
  - Selectable ship set
  - Up to 20 total ships
- Abilities:
  - Selectable

---

## Additional Features

- Sound effects
- Music
- SFX toggle / volume options
- Multiple graphic designs for boards and ships

---

## Priority

### Must Have

- Main menu
- SinglePlayer
- Local
- Classic mode
- Core turn-based gameplay
- Win/lose condition

### Should Have

- Difficulty selection
- Modern mode
- Statistics
- Settings

### Could Have

- Custom mode
- Music and sound options
- Multiple visual styles

### Future Phase

- Online multiplayer
- Lobby system
- Public/private rooms
- Lobby code join

## Non-Functional Requirements

- The codebase should be modular and scalable.
- Game modes should be extensible without rewriting the core game loop.
- UI screens should be separated clearly from game logic.
- Rules and configuration should be driven by data where possible.
- The project should be documented clearly from planning to implementation.

## Dependencies

- SinglePlayer depends on core gameplay systems and bot logic.
- Local depends on core gameplay systems and turn handoff flow.
- MultiPlayer depends on networking, lobby system, and synchronized game state.
- Modern mode depends on base classic rules, extended board support, special ship handling, and ability system.
- Custom mode depends on configurable rules, validation rules, and dynamic setup flow.
- Statistics depends on match result tracking and stored game history.
- Settings depends on a global settings/config system.
- Visual/audio customization depends on asset switching systems.
