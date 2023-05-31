import Button from "../Button/Button.js";
import { btnToP } from "../config/configBtn.js";
class Footer {
  constructor() {
    this.footer = document.createElement("footer");
  }
  moveToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render(parent) {
    this.footer.className = "footer";
    parent.append(this.footer);
    const container = document.createElement("div");
    container.className = "footer__content";
    this.footer.append(container);
    const button = new Button(btnToP, container).render(this.moveToTop);
  }
}
const footer = new Footer();
export default footer;
