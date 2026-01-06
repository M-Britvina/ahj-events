export default class Goblin {
  constructor(maxPosition) {
    this.position = null;
    this.maxPosition = maxPosition;
    this.element = this.createElement();
  }

  move() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.maxPosition);
    } while (newPosition === this.position);
    this.position = newPosition;
    return this.position;
  }

  createElement() {
    const element = document.createElement("img");
    element.src = "img/goblin.png";
    element.classList.add("goblin");
    element.alt = "Goblin";
    return element;
  }
}
