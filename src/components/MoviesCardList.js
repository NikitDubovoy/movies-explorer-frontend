import "../page/index.css";
import MoviesCard from "./MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "./Preloader";
import React from "react";
function MoviesCardList(props) {
  const isLocationSaved = useLocation().pathname === "/saved-movies";
  const message = `${
    isLocationSaved
      ? "Сохраненных фильмов нет"
      : props.isContent
      ? "Ничего подходящего не найдено"
      : "Начните искать фильм"
  }`;

  const movies = props.movies.slice(0, props.counter);

  const messageClassName = `${
    movies.length === 0
      ? "movies-card-list__message movies-card-list__message_active"
      : "movies-card-list__message"
  }`;

  const buttonClassName = `${
    props.counter >= props.movies.length
      ? "movies-card-list__button-more"
      : "movies-card-list__button-more movies-card-list__button-more_active"
  }`;

  return (
    <div className="movies-card-list">
      <h2 className={messageClassName}>{message}</h2>
      <Preloader isPreloader={props.isPreloader}></Preloader>
      {movies.map((movie) => (
        <MoviesCard
          isLocationSaved={isLocationSaved}
          idUser={props.idUser}
          saveMovies={props.saveMovies}
          onDeletedMovies={props.onDeletedMovies}
          movie={movie}
          onSavedMovies={props.onSavedMovies}
          key={isLocationSaved ? movie.movieId : movie.id}
        />
      ))}
      <button
        type="button"
        onClick={props.onButton}
        className={buttonClassName}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoviesCardList;
