export default class Counter {
  constructor(title, value) {
    this.title = title;
    this.value = value;
    this.element = this.createElement(title, value);
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("counter");
    element.innerHTML = `<span class="counter-title">${this.title}</span><span class="counter-value">${this.value}</span>`;
    return element;
  }

  render() {
    this.element.querySelector(".counter-value").textContent = this.value;
  }

  inc() {
    this.value++;
    this.render();
  }

  dec() {
    this.value--;
    this.render();
  }
}
