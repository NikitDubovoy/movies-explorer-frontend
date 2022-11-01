import React from "react";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import SavedMovies from "./SavedMovies.js";
import Profile from "./Profile.js";
import Movies from "./Movies.js";

import "../page/index.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/saved-movies" element={<SavedMovies />}></Route>
      <Route path="/movies" element={<Movies />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
