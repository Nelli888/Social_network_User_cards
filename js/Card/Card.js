import api from "../API/API.js";
import Button from "../Button/Button.js";
import { showMore, btnEdit, showPosts, btnDelete } from "../config/configBtn.js";
import { edit } from "../config/configModal.js";
import Modal from "../Modal/Modal.js";
import { photoUsers } from "../config/configPhoto.js";
import post from "../Post/Post.js";
class Card {
  constructor() {
    this.users = [];
  }
  async getUsers(url) {
    const users = await api.getData(url);
    this.users = users;
    return this.users;
  }
  render(parent) {
    parent.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "card";
    this.users.forEach((user) => {
      ul.append(this.renderCard(user));
    });
    parent.append(ul);
    this.users.forEach((user) => {
      this.renderButtons(user.id);
    });
  }
  renderCard({ id, name, username, email }) {
    const li = document.createElement("li");
    li.id = id;
    li.className = "card__item";
    li.innerHTML = `<p class="card__title">${name}</p>
    <div class="card__photo"><img src=${photoUsers[id].image}></div>
    <p><span>Username:</span> ${username}</p>
    <p><span>Email:</span> ${email}</p>
    <div class="card__btn"></div>
    <div class="card__menu"></div>
    <div class="card__info"></div>
    <ul class="card__posts"></ul>`;
    return li;
  }
  renderButtons(id) {
    const cardLi = document.getElementById(id);
    const menuBtn = cardLi.querySelector(".card__menu");
    const btnLoadParent = cardLi.querySelector(".card__btn");
    new Button(showPosts, menuBtn).render(this.handlerShowPosts.bind(this));
    new Button(btnEdit, menuBtn).render(this.handlerEditCard.bind(this));
    new Button(btnDelete, menuBtn).render(this.handlerDeleteCard.bind(this));
    new Button(showMore, btnLoadParent).render(this.handlerShowMore.bind(this));
  }
  async handlerShowPosts(e) {
    const li = e.target.closest("li");
    const ulPosts = li.querySelector(".card__posts");
    ulPosts.innerHTML = "";
    if (!e.target.classList.contains("done")) {
      e.target.classList.add("done");
      const posts = await post.getPosts("/posts");
      post.render(li.id);
    } else {
      e.target.classList.remove("done");
    }
  }
  handlerShowMore(e) {
    const li = e.target.closest("li");
    const liInfo = li.querySelector(".card__info");
    const card = this.users.find(({ id }) => id === +li.id);
    if (e.target.textContent === "Show More") {
      this.renderShowMore(card, liInfo);
      e.target.textContent = "Hide";
    } else {
      liInfo.innerHTML = "";
      e.target.textContent = "Show More";
    }
  }
  async handlerDeleteCard(e) {
    e.preventDefault();
    const li = e.target.closest("li");
    const res = await api.deleteData("/users", li.id);
    if (res.message === "Successful delete") {
      this.users = this.users.filter(({ id }) => id !== +res.id);
      li.remove();
    }
    return this.users;
  }
  async handlerEditCard(e) {
    e.preventDefault();
    const li = e.target.closest("li");
    const finded = this.users.find((item) => item.id === +li.id);
    const parent = document.body;
    const modal = new Modal(edit, parent).render(finded);
  }
  renderShowMore({ website, address, company, phone }, parent) {
    const { city, street, suite } = address;
    const { name, catchPhrase } = company;
    parent.insertAdjacentHTML(
      "beforeend",
      ` <span>Address:</span>
        <ul>
          <li>${city}</li>
          <li>${street}</li> 
          <li>${suite}</li>
        </ul>
        <span>Company:</span>
        <ul>
          <li>"${name}"</li>
          <li>${catchPhrase}</li>
        </ul>
          <span>Website:</span>
        <ul>
          <li>www.${website}</li>
        </ul> 
          <span>Phone:</span>
          <p class="card__text"><i class="fa-solid fa-square-phone"></i> ${phone}</p>
        </ul> `
    );
  }
  addCard(card) {
    const cards = [...this.users, card];
    this.users = cards;
    console.log(this.users);
    return this.users;
  }
  editCard(res) {
    this.users = this.users.map((item) => (item.id === res.id ? res : item));
    const parent = document.querySelector(".main");
    this.render(parent);
  }
}
const card = new Card();
export default card;
