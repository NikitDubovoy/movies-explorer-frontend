import React from "react";
import { CookiesProvider } from "react-cookie";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import SavedMovies from "./SavedMovies.js";
import Profile from "./Profile.js";
import Movies from "./Movies.js";
import { UserContext } from "../context/CurrentUserContext";
import * as Auth from "./Auth.js";
import "../page/index.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound.js";
import api from "../utils/api.js";
import ProtectedRoute from "./ProtectedRouter.js";
import ProtectedRouterIsLogged from "./ProtectedRouterIsLogged";
import movieApi from "../utils/MoviesApi";
import MainApi from "../utils/MainApi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const checked =
    localStorage.getItem("checked") === null ||
    localStorage.getItem("checked") === "false"
      ? false
      : true;
  const search = localStorage.getItem("search") || "";
  const [currentUser, setCurrentUser] = React.useState(UserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(currentUser.password);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState(
    localStorage.getItem("beatFilm") === null
      ? []
      : JSON.parse(localStorage.getItem("beatFilm"))
  );
  const [newFilterList, setNewFilterList] = React.useState(
    JSON.parse(localStorage.getItem("newListMovie")) === null
      ? []
      : JSON.parse(localStorage.getItem("newListMovie"))
  );
  const [valueSearch, setValueSearch] = React.useState(search);
  const [valueSearchCheckbox, setValueSearchCheckbox] = React.useState(checked);
  const [isContent, setIsContent] = React.useState(false);
  const [counter, setCounter] = React.useState(null);
  const [addition, setAdition] = React.useState(null);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [saveSearchMovies, setSaveSearchMovies] = React.useState([]);
  const [saveSearchChecked, setSaveSearchChecked] = React.useState(false);
  const [saveSearchValue, setSaveSearchValue] = React.useState("");
  const [errStatusReg, setErrStatusReg] = React.useState(null);
  const [errStatusLogin, setErrStatusLogin] = React.useState(null);
  const [errStatusProfile, setErrStatusProfile] = React.useState(null);
  const [isPreloader, setPreloader] = React.useState(true);

  function getSaveMovies() {
    MainApi.getSavedMovies()
      .then((res) => {
        setSaveMovies(res);
      })
      .catch((err) => console.log(err));
  }

  function getMovie() {
    if (JSON.parse(localStorage.getItem("beatFilm")).length === 0) {
      movieApi
        .getInitialMovies()
        .then((data) => {
          setPreloader(true);
          setMoviesList(data);
          localStorage.setItem("beatFilm", JSON.stringify(data));
          console.log(isPreloader);
        })
        .finally(() => {
          setPreloader(false);
          console.log(isPreloader);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    if (localStorage.loggedIn === "true") {
      getMovie();
      getSaveMovies();
      setSaveSearchMovies(saveMovies);
    }
  }, [localStorage.loggedIn]);

  function handleButtonMore(e) {
    e.preventDefault();
    setCounter(counter + addition);
  }
  React.useEffect(() => {
    if (window.innerWidth >= 1280) {
      setAdition(3);
      setCounter(12);
    } else if (window.innerWidth >= 768) {
      setAdition(2);
      setCounter(8);
    } else if (320 <= window.innerWidth <= 420) {
      setAdition(2);
      setCounter(5);
    }
  }, [window.innerWidth]);

  function handleSearchValue(e) {
    setValueSearch(e.target.value);
  }

  function handleSaveSearchValue(e) {
    setSaveSearchValue(e.target.value);
  }

  function handleSearchCheckbox(e) {
    setValueSearchCheckbox(e.target.checked);
    localStorage.setItem("checked", e.target.checked);
  }

  function handleSubmitSearch(
    moviesList,
    setNewMovieList,
    checked,
    valueSearch
  ) {
    const newListMovie = moviesList.filter((movie) => {
      if (!checked || movie.duration <= 40)
        return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
    });
    if (location.pathname === "/movies") {
      localStorage.setItem("search", valueSearch);
      localStorage.setItem("newListMovie", JSON.stringify(newListMovie));
    }
    setNewMovieList(newListMovie);
    if (newListMovie.length === 0) {
      setIsContent(true);
    } else {
      setIsContent(false);
    }
  }

  React.useEffect(() => {
    if (Object.keys(currentUser).length) {
      setName(currentUser.name);
      setPassword(currentUser.password);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSaveSearchChecked(e) {
    setSaveSearchChecked(e.target.checked);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  React.useEffect(() => {
    if (localStorage.loggedIn === "true") {
      getUser();
    }
  }, []);

  function getUser() {
    api
      .getUser()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }
        console.log(err);
      });
  }

  React.useState(() => {
    setSaveSearchMovies(saveMovies);
  }, [saveMovies]);

  function handleSubmitRegister(name, email, password) {
    Auth.register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
          handleSubmitSignIn(email, password);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }

        setErrStatusReg(err);
      });
  }

  function handleSubmitSignIn(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data) {
          handleLoggedIn();
          navigate("/movies");
          setCurrentUser(data);
        }
      })
      .catch((err) => setErrStatusLogin(err));
  }

  function handleUpdateUser(user) {
    api
      .setUser(user)
      .then((res) => {
        setCurrentUser(res);
        setErrStatusProfile(200);
      })
      .catch((err) => {
        setErrStatusProfile(err.status);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  function logout() {
    api.logout().then(() => {
      setLoggedIn(false);
      navigate("/");
      localStorage.clear();
    });
  }

  function handleSavedMovies(movie) {
    MainApi.setSavedMovies(movie)
      .then((res) => {
        const NewList = [...saveMovies, res];
        setSaveMovies(NewList);
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }

        setErrStatusReg(err);
      });
  }

  function handleDeleteMovies(idMovie) {
    MainApi.deletedMovies(idMovie)
      .then((res) => {
        setSaveMovies(saveMovies.filter((movie) => movie._id !== res._id));
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }
        setErrStatusReg(err);
      });
  }

  return (
    <CookiesProvider>
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={
              <ProtectedRouterIsLogged>
                <Register
                  onSubmit={handleSubmitRegister}
                  onEmail={handleEmailChange}
                  onPassword={handlePasswordChange}
                  errStatus={errStatusReg}
                />
              </ProtectedRouterIsLogged>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRouterIsLogged>
                <Login
                  onSubmit={handleSubmitSignIn}
                  onEmail={handleEmailChange}
                  onPassword={handlePasswordChange}
                  errStatus={errStatusLogin}
                />
              </ProtectedRouterIsLogged>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLogged={loggedIn}>
                <SavedMovies
                  onDeletedMovie={handleDeleteMovies}
                  saveMovies={saveMovies}
                  idUser={currentUser._id}
                  onSavedMovies={handleSavedMovies}
                  onButtonMore={handleButtonMore}
                  counter={counter}
                  isCheckdox={valueSearchCheckbox}
                  isContent={isContent}
                  onValueCheckbox={handleSearchCheckbox}
                  onSubmitSearch={handleSubmitSearch}
                  isLoggedIn={loggedIn}
                  saveSearchMovies={saveSearchMovies}
                  setSaveSearchMovies={setSaveSearchMovies}
                  handleSaveSearchChecked={handleSaveSearchChecked}
                  valueSearch={valueSearch}
                  getSaveMovies={getSaveMovies}
                  saveSearchChecked={saveSearchChecked}
                  setSaveSearchChecked={setSaveSearchChecked}
                  saveSearchValue={saveSearchValue}
                  setSaveSearchValue={setSaveSearchValue}
                  handleSaveSearchValue={handleSaveSearchValue}
                  getMovie={getMovie}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLogged={loggedIn}>
                <Movies
                  valueSearch={valueSearch}
                  onDeletedMovie={handleDeleteMovies}
                  saveMovies={saveMovies}
                  idUser={currentUser._id}
                  onSavedMovies={handleSavedMovies}
                  onButtonMore={handleButtonMore}
                  counter={counter}
                  isCheckbox={valueSearchCheckbox}
                  isContent={isContent}
                  handleSearchValue={handleSearchValue}
                  onValueCheckbox={handleSearchCheckbox}
                  onSubmitSearch={handleSubmitSearch}
                  isLoggedIn={loggedIn}
                  moviesList={moviesList}
                  newFilterList={newFilterList}
                  setNewFilterList={setNewFilterList}
                  isPreloader={isPreloader}
                  getMovie={getMovie}
                  getSaveMovies={getSaveMovies}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLogged={loggedIn}>
                <Profile
                  errStatus={errStatusProfile}
                  setErrStatus={setErrStatusProfile}
                  isLoggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </UserContext.Provider>
    </CookiesProvider>
  );
}

export default App;
