class Ship {
  constructor(definition) {
    this.id = definition.id;
    this.name = definition.name;
    this.size = definition.size;
    this.shape = definition.shape;
    this.hits = 0;
  }

  hit() {
    if (!this.isSunk()) {
      this.hits += 1;
    }
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

export default Ship;
