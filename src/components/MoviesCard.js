import "../page/index.css";
import image from "../images/tmp/pic__COLOR_pic.jpg";

function MoviesCard(props) {
  const isSaved = props.isSaved;

  const classButton = `${
    !isSaved
      ? "movies-card__button movies-card__button_like"
      : "movies-card__button movies-card__button_remove"
  }   `;
  return (
    <div className="movies-card">
      <img className="movies-card__img" src={image} alt="imageCard"></img>
      <h2 className="movies-card__title">33 слова о дизайне</h2>
      <button type="button" className={classButton}></button>
      <p className="movies-card__time">1ч 47м</p>
    </div>
  );
}

export default MoviesCard;
