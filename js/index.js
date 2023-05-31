import header from "./Header/header.js";
import main from "./Main/Main.js";
import card from "./Card/Card.js";
import footer from "./Footer/Footer.js";

async function render() {
  const parent = document.querySelector(".body");
  header.render(parent);
  main.render(parent);
  footer.render(parent);
  const parentCard = document.querySelector(".main");
  const users = card.getUsers("/users");
  users.then(() => card.render(parentCard));
}
render();
