class Api {
  constructor(url) {
    this._url = url;
  }

  getAppInfo() {
    return Promise.all([this.getInitialMovies()]);
  }

  _getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject("Error");
  }

  getInitialMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const movieApi = new Api("https://api.nomoreparties.co");

export default movieApi;
