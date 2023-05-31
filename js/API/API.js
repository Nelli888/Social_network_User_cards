class API {
  constructor() {
    this.baseUrl = "https://ajax.test-danit.com/api/json";
  }
  async getData(url) {
    const response = await fetch(`${this.baseUrl}${url}`);
    return response.json();
  }
  async deleteData(url, id) {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 404) {
      const data = { message: "Successful delete", id };
      return data;
    }
  }
  async editData(url, id, data) {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200 || response.status === 404) {
      return { ...data, id };
    }
  }
  async createData(url, data) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status) {
      const data = await response.json();
      return data;
    }
  }
}
const api = new API();
export default api;
