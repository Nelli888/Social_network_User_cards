class Main {
  constructor() {
    this.main = document.createElement("main");
  }
  render(parent) {
    this.main.className = "main";
    parent.append(this.main);
  }
}
const main = new Main();
export default main;
