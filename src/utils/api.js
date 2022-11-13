class Api {
  constructor(url) {
    this._url = url;
  }

  getAppInfo() {
    return Promise.all([this.getUser()]);
  }

  _getResponseData(data) {
    if (data.ok) {
      return data.json();
    }

    return Promise.reject("Error");
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUser(user) {
    const body = {
      name: user.name,
      email: user.email,
    };
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const api = new Api("https://api.movies2.nomoredomains.icu");

export default api;
