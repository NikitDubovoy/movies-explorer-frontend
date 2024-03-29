const BASE_URL = "https://api.movies2.nomoredomains.icu";
/* const BASE_URL = "http://localhost:3001"; */

function getResponseData(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(data);
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return this._getResponseData(res.status);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.status === 200) {
      localStorage.setItem("beatFilm", JSON.stringify([]));
      localStorage.setItem("loggedIn", true);
    } else {
      return getResponseData(response.status);
    }
    return getResponseData(response);
  });
};
