import api from "../API/API.js";
class Post {
  constructor() {}
  async getPosts(url) {
    const posts = await api.getData(url);
    this.posts = posts;
    return this.posts;
  }
  render(id) {
    const filtered = this.posts.filter((item) => item.userId === +id);
    filtered.forEach((element) => {
      const parent = document.getElementById(element.userId);
      const ul = parent.querySelector(".card__posts");
      ul.append(this.renderPost(element));
    });
  }
  renderPost({ title, body, id }) {
    const li = document.createElement("li");
    li.id = `post-${id}`;
    li.className = "card__post";
    li.innerHTML = `<p class="card__title">${title}</p>
    <p class="card__text-post">${body}</p>`;
    return li;
  }
}
const post = new Post();
export default post;
