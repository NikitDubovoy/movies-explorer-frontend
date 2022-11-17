class Api {
  constructor(url) {
    this._url = url;
  }

  getAppInfo() {
    return Promise.all([this.setMovies()]);
  }

  _getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject("Error");
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deletedMovies(idMovies) {
    return fetch(`${this._url}/movies/${idMovies}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setSavedMovies(movie) {
    const body = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });
  }
}
const mainApi = new Api("https://api.movies2.nomoredomains.icu");
/* const mainApi = new Api("http://localhost:3001"); */

export default mainApi;
