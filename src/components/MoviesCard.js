import "../page/index.css";
import React from "react";
import { UserContext } from "../context/CurrentUserContext";

function MoviesCard(props) {
  const user = React.useContext(UserContext);
  const location = props.isLocationSaved;
  const apiUrl = `https://api.nomoreparties.co`;
  const image = `${
    location ? props.movie.image : `${apiUrl}${props.movie.image.url}`
  }`;
  const movieId = Number(`${location ? props.movie.movieId : props.movie.id}`);
  function transformDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours === 0 ? "" : hours + "ч"} ${
      minutes === 0 ? "" : minutes + "м"
    }`;
  }

  const duration = transformDuration(props.movie.duration);

  const isLiked = props.saveMovies.some(
    (i) => i.movieId === props.movie.id && i.owner === user._id
  );

  const movieSaved = props.saveMovies.find(
    (i) => i.movieId === movieId && i.owner === user._id
  );
  function handleSavedButton(e) {
    e.preventDefault();
    props.onSavedMovies({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: image,
      trailerLink: props.movie.trailerLink,
      owner: user._id,
      thumbnail: `${apiUrl}${props.movie.image.formats.thumbnail.url}`,
      movieId: props.movie.id,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
    });
  }

  function handleDeletedButton(e) {
    e.preventDefault();
    props.onDeletedMovies(movieSaved._id);
  }

  const classButton = `${
    location
      ? "movies-card__button movies-card__button_remove"
      : isLiked
      ? "movies-card__button movies-card__button_like-active"
      : "movies-card__button movies-card__button_like"
  }`;

  return (
    <a className="movies-card" href={props.movie.trailerLink} target="_blank">
      <img className="movies-card__img" src={image} alt="imageCard"></img>
      <h2 className="movies-card__title">{props.movie.nameRU}</h2>
      <button
        type="button"
        onClick={
          location
            ? handleDeletedButton
            : isLiked
            ? handleDeletedButton
            : handleSavedButton
        }
        className={classButton}
      ></button>
      <p className="movies-card__time">{duration}</p>
    </a>
  );
}

export default MoviesCard;
