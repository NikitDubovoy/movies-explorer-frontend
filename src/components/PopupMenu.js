import { Link } from "react-router-dom";
import icon from "../images/Header/icon.svg";
import "../page/index.css";

function PopupMenu(props) {
  return (
    <div
      className={
        props.onBurgerMenu ? "popup-menu popup-menu_active" : "popup-menu"
      }
    >
      <div className="popup-menu__block">
        <button
          type="button"
          className="popup-menu__close"
          onClick={props.onClose}
        ></button>
        <nav className="popup-menu__nav">
          <Link to="/" className="popup-menu__link">
            Главная
          </Link>
          <Link to="/movies" className="popup-menu__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="popup-menu__link">
            Сохранённые фильмы
          </Link>
        </nav>
        <Link
          to="/profile"
          className="popup-menu__link popup-menu__link_account"
        >
          <img className="popup-menu__link-img" alt="icon" src={icon}></img>
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default PopupMenu;
