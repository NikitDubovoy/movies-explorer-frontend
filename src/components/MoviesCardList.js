import "../page/index.css";
import MoviesCard from "./MoviesCard";

function MoviesCardList(props) {
  return (
    <div className="movies-card-list">
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
    </div>
  );
}

export default MoviesCardList;
