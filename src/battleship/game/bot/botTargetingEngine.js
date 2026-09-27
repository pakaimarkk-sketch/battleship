const DEFAULT_WEIGHTS = Object.freeze({
  heat: 1,
  information: 0.35,
  unresolvedHit: 8,
});

function assertCoordinate(coordinate, label = "coordinate") {
  if (
    !coordinate ||
    !Number.isInteger(coordinate.row) ||
    !Number.isInteger(coordinate.col)
  ) {
    throw new TypeError(`${label} must contain integer row and col values`);
  }
}

function coordinateKey({ row, col }) {
  return `${row},${col}`;
}

function createCell(row, col) {
  return {
    row,
    col,
    heatScore: 0,
    informationScore: 0,
    hitConnectionScore: 0,
    finalScore: 0,
    supportingPlacements: 0,
  };
}

export class TargetingEngine {
  constructor({ weights = {}, random = Math.random } = {}) {
    this.weights = { ...DEFAULT_WEIGHTS, ...weights };

    if (typeof random !== "function") {
      throw new TypeError("random must be a function");
    }

    this.random = random;
  }

  analyze({ board, remainingFleet, attackHistory = [] }) {
    this.#validateInput(board, remainingFleet, attackHistory);

    const knowledge = this.#buildKnowledge(attackHistory);
    const placements = this.#generateValidPlacements(
      board,
      remainingFleet,
      knowledge,
    );
    const scoreMap = this.#createScoreMap(board);

    this.#applyPlacementScores(scoreMap, placements, knowledge);
    this.#applyInformationScores(scoreMap, placements.length);
    this.#applyFinalScores(scoreMap);

    const candidates = this.#getBestCandidates(scoreMap, knowledge.attacked);

    return {
      scoreMap,
      possiblePlacements: placements,
      possiblePlacementCount: placements.length,
      candidates,
      knowledge,
    };
  }

  chooseTarget(input) {
    const analysis = this.analyze(input);

    if (analysis.candidates.length === 0) {
      return { target: null, ...analysis };
    }

    const index = Math.floor(this.random() * analysis.candidates.length);
    const selected =
      analysis.candidates[Math.min(index, analysis.candidates.length - 1)];

    return {
      target: { row: selected.row, col: selected.col },
      ...analysis,
    };
  }

  #validateInput(board, fleet, attackHistory) {
    if (
      !board ||
      !Number.isInteger(board.rows) ||
      !Number.isInteger(board.cols) ||
      board.rows < 1 ||
      board.cols < 1 ||
      board.rows > 30 ||
      board.cols > 30
    ) {
      throw new RangeError(
        "board rows and cols must be integers between 1 and 30",
      );
    }

    if (!Array.isArray(fleet)) {
      throw new TypeError("remainingFleet must be an array");
    }

    for (const ship of fleet) {
      if (
        !ship?.id ||
        !Array.isArray(ship.orientations) ||
        ship.orientations.length === 0
      ) {
        throw new TypeError(
          "Every ship needs an id and at least one orientation",
        );
      }

      for (const orientation of ship.orientations) {
        if (!Array.isArray(orientation) || orientation.length === 0) {
          throw new TypeError("Every orientation must be a non-empty array");
        }
        orientation.forEach((cell) =>
          assertCoordinate(cell, "orientation cell"),
        );
      }
    }

    if (!Array.isArray(attackHistory)) {
      throw new TypeError("attackHistory must be an array");
    }
  }

  #buildKnowledge(attackHistory) {
    const attacked = new Set();
    const misses = new Set();
    const unresolvedHits = new Set();
    const sunkCells = new Set();

    for (const attack of attackHistory) {
      assertCoordinate(attack.coordinate, "attack coordinate");
      const key = coordinateKey(attack.coordinate);
      attacked.add(key);

      if (attack.result === "miss") {
        misses.add(key);
        continue;
      }

      if (attack.result === "hit") {
        unresolvedHits.add(key);
        continue;
      }

      if (attack.result === "sunk") {
        const coordinates = attack.sunkCoordinates ?? [attack.coordinate];

        for (const coordinate of coordinates) {
          assertCoordinate(coordinate, "sunk coordinate");
          const sunkKey = coordinateKey(coordinate);
          attacked.add(sunkKey);
          unresolvedHits.delete(sunkKey);
          sunkCells.add(sunkKey);
        }
        continue;
      }

      throw new TypeError(`Unknown attack result: ${attack.result}`);
    }

    return { attacked, misses, unresolvedHits, sunkCells };
  }

  #generateValidPlacements(board, fleet, knowledge) {
    const placements = [];

    for (const ship of fleet) {
      for (
        let orientationIndex = 0;
        orientationIndex < ship.orientations.length;
        orientationIndex += 1
      ) {
        const orientation = ship.orientations[orientationIndex];

        for (let originRow = 0; originRow < board.rows; originRow += 1) {
          for (let originCol = 0; originCol < board.cols; originCol += 1) {
            const coordinates = orientation.map(({ row, col }) => ({
              row: originRow + row,
              col: originCol + col,
            }));

            if (!this.#isValidPlacement(coordinates, board, knowledge))
              continue;

            const hitCount = coordinates.reduce(
              (count, coordinate) =>
                count +
                Number(knowledge.unresolvedHits.has(coordinateKey(coordinate))),
              0,
            );

            placements.push({
              shipId: ship.id,
              orientationIndex,
              origin: { row: originRow, col: originCol },
              coordinates,
              hitCount,
            });
          }
        }
      }
    }

    return placements;
  }

  #isValidPlacement(coordinates, board, knowledge) {
    return coordinates.every((coordinate) => {
      const inside =
        coordinate.row >= 0 &&
        coordinate.row < board.rows &&
        coordinate.col >= 0 &&
        coordinate.col < board.cols;

      if (!inside) return false;

      const key = coordinateKey(coordinate);
      return !knowledge.misses.has(key) && !knowledge.sunkCells.has(key);
    });
  }

  #createScoreMap(board) {
    return Array.from({ length: board.rows }, (_, row) =>
      Array.from({ length: board.cols }, (_, col) => createCell(row, col)),
    );
  }

  #applyPlacementScores(scoreMap, placements, knowledge) {
    const targetingAHit = knowledge.unresolvedHits.size > 0;

    for (const placement of placements) {
      const hitMultiplier =
        placement.hitCount > 0
          ? this.weights.unresolvedHit ** placement.hitCount
          : 1;

      const searchMultiplier =
        targetingAHit && placement.hitCount === 0 ? 0.1 : 1;
      const weight = hitMultiplier * searchMultiplier;

      for (const coordinate of placement.coordinates) {
        const cell = scoreMap[coordinate.row][coordinate.col];
        cell.heatScore += weight;
        cell.supportingPlacements += 1;

        if (placement.hitCount > 0) {
          cell.hitConnectionScore += hitMultiplier;
        }
      }
    }
  }

  #applyInformationScores(scoreMap, totalPlacements) {
    if (totalPlacements === 0) return;

    for (const row of scoreMap) {
      for (const cell of row) {
        const probability = cell.supportingPlacements / totalPlacements;

        if (probability <= 0 || probability >= 1) {
          cell.informationScore = 0;
          continue;
        }

        cell.informationScore = -(
          probability * Math.log2(probability) +
          (1 - probability) * Math.log2(1 - probability)
        );
      }
    }
  }

  #applyFinalScores(scoreMap) {
    for (const row of scoreMap) {
      for (const cell of row) {
        cell.finalScore =
          cell.heatScore * this.weights.heat +
          cell.informationScore * this.weights.information;
      }
    }
  }

  #getBestCandidates(scoreMap, attacked) {
    let highestScore = -Infinity;
    const candidates = [];

    for (const row of scoreMap) {
      for (const cell of row) {
        if (attacked.has(coordinateKey(cell))) continue;
        if (cell.supportingPlacements === 0) continue;

        if (cell.finalScore > highestScore) {
          highestScore = cell.finalScore;
          candidates.length = 0;
          candidates.push(cell);
        } else if (cell.finalScore === highestScore) {
          candidates.push(cell);
        }
      }
    }

    return candidates;
  }
}

export function numericScoreMap(
  scoreMap,
  property = "finalScore",
  precision = 2,
) {
  return scoreMap.map((row) =>
    row.map((cell) => Number(cell[property].toFixed(precision))),
  );
}
