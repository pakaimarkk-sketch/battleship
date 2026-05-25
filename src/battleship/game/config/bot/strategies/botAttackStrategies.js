export function strategyRandomAttack(board) {
  const availableTiles = getUnattackedTiles(board);
  return getRandomItem(availableTiles);
}

export function strategyCheckerboardAttack(board) {
  const checkerboardTiles = getUnattackedTiles(board).filter(({ x, y }) => {
    return (x + y) % 2 === 0;
  });

  if (checkerboardTiles.length > 0) {
    return getRandomItem(checkerboardTiles);
  }

  return strategyRandomAttack(board);
}

export function strategyHuntMode(board, memory) {
  cleanHuntQueue(board, memory);

  const nextTarget = memory.huntQueue.shift();

  if (nextTarget) {
    return nextTarget;
  }

  return null;
}

export function updateHuntMemory(memory, attack, result) {
  const wasHit = result.result === "hit" || result.result === "sunk";

  if (!wasHit) {
    return;
  }

  memory.hits.push(attack);

  if (result.result === "sunk") {
    clearHuntMemory(memory);
    return;
  }

  addAdjacentTargets(memory, attack.x, attack.y);
}

export function createAttackMemory() {
  return {
    hits: [],
    huntQueue: [],
  };
}

function addAdjacentTargets(memory, x, y) {
  const targets = [
    { x, y: y - 1 },
    { x: x + 1, y },
    { x, y: y + 1 },
    { x: x - 1, y },
  ];

  for (const target of targets) {
    if (!hasQueuedTarget(memory, target.x, target.y)) {
      memory.huntQueue.push(target);
    }
  }
}

function hasQueuedTarget(memory, x, y) {
  return memory.huntQueue.some((target) => {
    return target.x === x && target.y === y;
  });
}

function cleanHuntQueue(board, memory) {
  memory.huntQueue = memory.huntQueue.filter(({ x, y }) => {
    return isInsideBoard(board, x, y) && !board.wasAttacked(x, y);
  });
}

function clearHuntMemory(memory) {
  memory.hits = [];
  memory.huntQueue = [];
}

function getUnattackedTiles(board) {
  const tiles = [];

  for (let y = 0; y < board.size; y += 1) {
    for (let x = 0; x < board.size; x += 1) {
      if (!board.wasAttacked(x, y)) {
        tiles.push({ x, y });
      }
    }
  }

  return tiles;
}

function isInsideBoard(board, x, y) {
  return x >= 0 && x < board.size && y >= 0 && y < board.size;
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}
