import Game from "./game/Game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(4);
  game.start();
});
