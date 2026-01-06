import Goblin from "./Goblin";
import Counter from "./Counter";

export default class Game {
  constructor(size = 4) {
    this.size = size;
    this.container = null;
    this.goblin = new Goblin(size * size);
    this.hitCounter = new Counter("Попаданий", 0);
    this.healthCounter = new Counter("Жизней", 5);
    this.timer = null;
    this.wasHit = false;
    this.gameOver = false;
    this.render();
  }

  render() {
    const gameContainer = document.querySelector(".game-container");

    gameContainer.appendChild(this.hitCounter.element);
    gameContainer.appendChild(this.healthCounter.element);

    this.container = document.createElement("div");
    this.container.classList.add("field");
    this.container.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
    this.container.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;

    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = "cell-" + i;
      this.container.appendChild(cell);
    }

    gameContainer.appendChild(this.container);

    gameContainer.addEventListener(
      "click",
      (event) => {
        if (this.gameOver) {
          return;
        }
        let targetCell = event.target.closest(".cell");
        if (targetCell && targetCell.querySelector(".goblin")) {
          this.wasHit = true;
          this.hitCounter.inc();
          targetCell.removeChild(this.goblin.element);
        }
      },
      false,
    );
  }

  start() {
    let goblinPosition = this.goblin.move();
    document
      .getElementById(`cell-${goblinPosition}`)
      .appendChild(this.goblin.element);

    this.timer = setInterval(() => {
      if (!this.wasHit) {
        this.healthCounter.dec();
      }

      if (this.healthCounter.value === 0) {
        this.stop();
      } else {
        this.wasHit = false;
        let goblinPosition = this.goblin.move();
        document
          .getElementById(`cell-${goblinPosition}`)
          .appendChild(this.goblin.element);
      }
    }, 1000);
  }

  stop() {
    this.gameOver = true;
    clearInterval(this.timer);
    alert(`Вы проиграли! Счёт ${this.hitCounter.value}`);
  }
}
