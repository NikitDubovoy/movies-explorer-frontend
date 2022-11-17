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
  const [currentUser, setCurrentUser] = React.useState({});
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(currentUser.password);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [newFilterList, setNewFilterList] = React.useState(
    JSON.parse(localStorage.getItem("newListMovie")) === null
      ? moviesList
      : JSON.parse(localStorage.getItem("newListMovie"))
  );
  const [valueSearch, setValueSearch] = React.useState(search);
  const [valueSearchCheckbox, setValueSearchCheckbox] = React.useState(checked);
  const [isContent, setIsContent] = React.useState(false);
  const [counter, setCounter] = React.useState(null);
  const [addition, setAdition] = React.useState(null);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [saveSearchMovies, setSaveSearchMovies] = React.useState([]);
  const [errStatusReg, setErrStatusReg] = React.useState(null);
  const [errStatusLogin, setErrStatusLogin] = React.useState(null);
  const [errStatusProfile, setErrStatusProfile] = React.useState(null);
  const [isPreloader, setPreloader] = React.useState(true);

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

  function handleSearchCheckbox(e) {
    setValueSearchCheckbox(e.target.checked);
    localStorage.setItem("checked", !e.target.checked);
  }

  function handleSubmitSearch(moviesList, setNewMovieList, checked) {
    getMovie();
    getSaveMovies();
    const newListMovie = moviesList.filter((movie) => {
      if (checked || movie.duration <= 40)
        return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
    });
    if (location.pathname === "/movies") {
      localStorage.setItem("search", valueSearch);
      localStorage.setItem("newListMovie", JSON.stringify(newListMovie));
    }
    setNewMovieList(newListMovie);
    if (moviesList.length === 0) {
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

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  function getSaveMovies() {
    MainApi.getSavedMovies()
      .then((res) => {
        setSaveMovies(res);
      })
      .catch((err) => console.log(err));
  }

  function getMovie() {
    movieApi
      .getInitialMovies()
      .then((data) => {
        setMoviesList(data);
        setPreloader(true);
      })
      .finally(() => setPreloader(false))
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (localStorage.loggedIn === "true") {
      api
        .getUser()
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
      MainApi.getSavedMovies()
        .then((res) => {
          setSaveMovies(res);
        })
        .catch((err) => console.log(err));
      setSaveSearchMovies(saveMovies);
    }
  }, [moviesList.length != 0, saveMovies]);

  function handleSubmitRegister(name, email, password) {
    Auth.register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
          handleSubmitSignIn(email, password);
        }
      })
      .catch((err) => setErrStatusReg(err));
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
        setErrStatusProfile("");
      })
      .catch((err) => {
        setErrStatusProfile(err);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    api.logout().then(() => {
      setLoggedIn(false);
      navigate("/");
      localStorage.loggedIn = "";
    });
  }

  function handleSavedMovies(movie) {
    MainApi.setSavedMovies(movie)
      .then(() => {
        getSaveMovies();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovies(idMovie) {
    MainApi.deletedMovies(idMovie)
      .then(() => {
        getSaveMovies();
      })
      .catch((err) => console.log(err));
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
                  onValueSearh={handleSearchValue}
                  onValueCheckbox={handleSearchCheckbox}
                  onSubmitSearch={handleSubmitSearch}
                  isLoggedIn={loggedIn}
                  saveSearchMovies={saveSearchMovies}
                  setSaveSearchMovies={setSaveSearchMovies}
                  valueSearch={valueSearch}
                  handleSearchValue={handleSearchValue}
                  getSaveMovies={getSaveMovies}
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
