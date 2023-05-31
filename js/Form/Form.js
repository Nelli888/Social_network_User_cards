import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import card from "../Card/Card.js";
let counter = 10;
import {
  inputName,
  inputEmail,
  inputUsername,
  inputWebsite,
  inputPhone,
  inputCityAddress,
  inputStreetAddress,
  inputSuiteAddress,
  inputCompanyName,
  inputCompanycatchPhrase,
} from "../config/configInput.js";
import { btnSubmit, btnCancel, btnSubmitEdit } from "../config/configBtn.js";
import api from "../API/API.js";

class Form {
  constructor(closeModal) {
    this.closeModal = closeModal;
    this.form = document.createElement("form");
    this.form.className = "form";
  }
  render(data) {
    const nameInput = new Input(inputName).render(data.name);
    const usernameInput = new Input(inputUsername).render(data.username);
    const emailInput = new Input(inputEmail).render(data.email);
    const captionAddress = document.createElement("div");
    captionAddress.className = "form__text";
    captionAddress.innerHTML = "Address:";
    const cityInput = new Input(inputCityAddress).render(data ? data.address.city : "");
    const streetInput = new Input(inputStreetAddress).render(data ? data.address.street : "");
    const suiteInput = new Input(inputSuiteAddress).render(data ? data.address.suite : "");
    const captionCompany = document.createElement("div");
    captionCompany.className = "form__text";
    captionCompany.innerHTML = "Company:";
    const companyInput = new Input(inputCompanyName).render(data ? data.company.name : "");
    const catchPhraseInput = new Input(inputCompanycatchPhrase).render(data ? data.company.catchPhrase : "");
    const captionContacts = document.createElement("div");
    captionContacts.className = "form__text";
    captionContacts.innerHTML = "Contacts:";
    const websiteInput = new Input(inputWebsite).render(data.website);
    const phoneInput = new Input(inputPhone).render(data.phone);
    this.form.append(
      nameInput,
      usernameInput,
      emailInput,
      captionAddress,
      cityInput,
      streetInput,
      suiteInput,
      captionCompany,
      companyInput,
      catchPhraseInput,
      captionContacts,
      websiteInput,
      phoneInput
    );
    if (data) {
      const submitBtnEdit = new Button(btnSubmitEdit, this.form).render();
      this.form.addEventListener("submit", this.handleEditSubmit.bind(this, data.id));
    }
    if (!data) {
      const submitBtn = new Button(btnSubmit, this.form).render();
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
    const cancelBtn = new Button(btnCancel, this.form).render(this.closeModal);
    return this.form;
  }
  async handleSubmit(e) {
    e.preventDefault();
    const formData = this.createFormData();
    const res = await api.createData("/users", formData);
    res.id = ++counter;
    this.renderCard(res);
  }
  async handleEditSubmit(id, e) {
    e.preventDefault();
    const idLi = document.getElementById(id);
    const formData = this.createFormData();
    const res = await api.editData("/users", id, formData);
    card.editCard(res, idLi);
    this.closeModal();
  }
  createFormData() {
    const inputs = this.form.querySelectorAll(".inpt");
    const formData = {};
    const objAddress = {};
    const objCompany = {};
    inputs.forEach((item) => {
      if (item.name === "city" || item.name === "street" || item.name === "suite") {
        objAddress[item.name] = item.value;
      } else if (item.name === "nameCompany") {
        objCompany["name"] = item.value;
      } else if (item.name === "catchPhrase") {
        objCompany[item.name] = item.value;
      } else {
        formData[item.name] = item.value;
      }
    });
    formData["address"] = objAddress;
    formData["company"] = objCompany;
    return formData;
  }
  renderCard(res) {
    const li = card.renderCard(res);
    const ul = document.querySelector(".card");
    ul.append(li);
    card.addCard(res);
    card.renderButtons(res.id);
    this.closeModal();
  }
}
export default Form;
