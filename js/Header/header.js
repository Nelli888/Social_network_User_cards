import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";
import { btnCreate, btnDown } from "../config/configBtn.js";
import { registration } from "../config/configModal.js";

class Header {
  constructor() {
    this.header = document.createElement("header");
  }
  addCardModal() {
    const parent = document.body;
    const modal = new Modal(registration, parent).render("");
  }
  moveDown() {
    const footer = document.querySelector(".footer");
    footer.scrollIntoView({ behavior: "smooth", block: "end" });
  }
  render(parent) {
    this.header.className = "header";
    parent.append(this.header);
    const container = document.createElement("div");
    container.className = "header__content";
    this.header.append(container);
    const button = new Button(btnCreate, container).render(this.addCardModal);
    const buttonDown = new Button(btnDown, container).render(this.moveDown);
  }
}
const header = new Header();
export default header;
