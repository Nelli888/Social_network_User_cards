class Button {
  constructor({ text, id, className, type, icon }, parent) {
    (this.text = text), (this.id = id), (this.className = className), (this.type = type), (this.icon = icon), (this.parent = parent);
  }
  render(handleClick) {
    const button = document.createElement("button");
    button.id = this.id;
    button.className = this.className;
    button.innerHTML = this.text + this.icon;
    button.type = this.type;
    button.addEventListener("click", handleClick);
    this.parent.append(button);
  }
}
export default Button;
