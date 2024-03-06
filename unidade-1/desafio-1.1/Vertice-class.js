class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  distancia(v) {
    const distance = Math.sqrt((this.#x - v.x) ** 2 + (this.#y - v.y) ** 2);

    return distance;
  }

  move(x, y) {
    this.#x = x;
    this.#y = y;
  }

  equals(vertice) {
    if (this.#x == vertice.x && this.#y == vertice.y) {
      return true;
    }

    return false;
  }
}

module.exports = Vertice