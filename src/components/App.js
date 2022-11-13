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
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import NotFound from "./NotFound.js";
import api from "../utils/api.js";
import ProtectedRoute from "./ProtectedRouter.js";
import movieApi from "../utils/MoviesApi";
import MainApi from "../utils/MainApi";
import useValidationServerStatus from "./ValidationServerStatus";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(currentUser.password);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [valueSearch, setValueSearch] = React.useState("");
  const [newFilterList, setNewFilterList] = React.useState([]);
  const [valueSearchCheckbox, setValueSearchCheckbox] = React.useState(false);
  const [isContent, setIsContent] = React.useState(false);
  const [counter, setCounter] = React.useState(null);
  const [addition, setAdition] = React.useState(null);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [saveSearchMovies, setSaveSearchMovies] = React.useState([]);
  const [errStatusReg, setErrStatusReg] = React.useState(null);
  const [errStatusLogin, setErrStatusLogin] = React.useState(null);
  const [errStatusProfile, setErrStatusProfile] = React.useState(null);
  const [isPreloader, setPreloader] = React.useState(false);

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
  }

  function handleSubmitSerach(moviesList, setNewMovieList) {
    getMovies();
    const filterSearch = moviesList.filter((movie) => {
      if (!valueSearchCheckbox || movie.duration <= 40)
        return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
    });
    if (filterSearch.length === 0) {
      setIsContent(true);
    } else {
      setIsContent(false);
    }
    setValueSearch("");
    setNewMovieList(filterSearch);
  }

  React.useEffect(() => {
    if (Object.keys(currentUser).length) {
      setName(currentUser.name);
      setPassword(currentUser.password);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  React.useEffect(() => {
    if (localStorage.loggedIn) {
      api
        .getUser()
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [localStorage]);

  function handleSubmitRegister(name, email, password) {
    Auth.register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      })
      .catch((err) => setErrStatusReg(err));
  }

  function handleSubmitSignIn(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data) {
          handleLoggedIn();
          navigate("/");
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

  function getMovies() {
    movieApi
      .getInitialMovies()
      .then((data) => {
        setMoviesList(data);
        getSavedMovies();
        setPreloader(true);
      })
      .finally(() => setPreloader(false))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSavedMovies(movie) {
    MainApi.setSavedMovies(movie)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovies(idMovie) {
    MainApi.deletedMovies(idMovie)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => console.log(err));
  }

  function getSavedMovies() {
    MainApi.getSavedMovies()
      .then((res) => {
        setSaveMovies(res.filter((movie) => movie.owner === currentUser._id));
      })
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    if (
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies"
    ) {
      getMovies();
      getSavedMovies();
    }
  }, [location]);

  return (
    <CookiesProvider>
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleSubmitRegister}
                onEmail={handleEmailChange}
                onPassword={handlePasswordChange}
                errStatus={errStatusReg}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit={handleSubmitSignIn}
                onEmail={handleEmailChange}
                onPassword={handlePasswordChange}
                errStatus={errStatusLogin}
              />
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
                  onSubmitSearch={handleSubmitSerach}
                  onValueSearch={handleSearchValue}
                  isLoggedIn={loggedIn}
                  saveSearchMovies={saveSearchMovies}
                  setSaveSearchMovies={setSaveSearchMovies}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLogged={loggedIn}>
                <Movies
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
                  onSubmitSearch={handleSubmitSerach}
                  getMovies={getMovies}
                  isLoggedIn={loggedIn}
                  moviesList={moviesList}
                  newFilterList={newFilterList}
                  setNewFilterList={setNewFilterList}
                  isPreloader={isPreloader}
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
                  userName={name}
                  setCurrentUser={setCurrentUser}
                  userEmail={email}
                  onName={handleNameChange}
                  onEmail={handleEmailChange}
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
