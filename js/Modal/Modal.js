import Form from "../Form/Form.js";
class Modal {
  constructor({ text, id, className, classActive }, parent) {
    (this.text = text), (this.id = id), (this.className = className), (this.classActive = classActive), (this.parent = parent);
  }
  render(data) {
    this.parent.insertAdjacentHTML("beforeend", this.text);
    const close = document.querySelector(".close");
    close.addEventListener("click", this.closeModal.bind(this));
    const modalBody = document.querySelector(".modal-body");
    const form = new Form(this.closeModal.bind(this)).render(data);
    modalBody.append(form);
  }
  closeModal() {
    document.querySelector(`.${this.className}`).remove();
  }
}
export default Modal;
