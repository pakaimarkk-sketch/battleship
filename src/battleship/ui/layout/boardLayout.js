import {
  createTextElement,
  appendChildren,
  createEl,
} from "../../utils/domHelpers.js";

export function createBoardLayout({ owner, boardSize, title }) {
  const wrapper = createEl("section", null, "board-wrapper");
  wrapper.dataset.owner = owner;

  const heading = createTextElement("h2", title, null, "board-title");

  const boardElement = createEl("div", null, "board");
  boardElement.dataset.owner = owner;
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

  for (let y = 0; y < boardSize; y += 1) {
    for (let x = 0; x < boardSize; x += 1) {
      const tile = createEl("button", null, "tile");

      tile.type = "button";
      tile.dataset.owner = owner;
      tile.dataset.x = String(x);
      tile.dataset.y = String(y);

      boardElement.append(tile);
    }
  }

  return appendChildren(wrapper, heading, boardElement);
}
