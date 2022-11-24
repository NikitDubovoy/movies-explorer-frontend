import React from "react";
import "../page/index.css";
import { Link, useLocation, NavLink } from "react-router-dom";
import PopupMenu from "./PopupMenu";

import icon from "../images/Header/icon.svg";
import icon_dark from "../images/Header/account.svg";

function Header(props) {
  const location = useLocation();
  const { isLoggedIn } = props;

  React.useEffect(() => {
    if (location.pathname === "/") {
      setIsMain(true);
    }
  }, [location]);

  const [isBurgerMenu, setBurgerMenu] = React.useState(false);
  const [isMain, setIsMain] = React.useState(false);

  function handleBurgerMenu() {
    setBurgerMenu(!isBurgerMenu);
  }

  const navLinkMainClassName = `${
    !isLoggedIn ? "header__nav-link header__nav-link_main" : "header__nav-link"
  }`;

  const navLinkMovies = `${
    isLoggedIn
      ? "header__nav-link header__nav-link_visible"
      : "header__nav-link"
  }`;

  const navLinkMoviesTheme = `${
    isMain
      ? `${navLinkMovies} header__nav_dark`
      : ` ${navLinkMovies} header__nav_light`
  }`;

  const headerClassName = `${isMain ? "header header_dark-theme" : "header"}`;

  const navLinkSigninClassName = `header__nav-link_signin ${navLinkMainClassName}`;
  const navLinkAccount = `${
    isLoggedIn ? "header__account header__account_active" : "header__account"
  }`;

  const navLinkAccountTheme = `${
    isMain
      ? `${navLinkAccount} header__nav_dark header__account_dark`
      : ` ${navLinkAccount} header__nav_light`
  }`;

  const burgerClassName = `${
    !isLoggedIn
      ? "header__burger"
      : location.pathname === "/"
      ? "header__burger header__burger_dark header__burger_active"
      : "header__burger header__burger_active"
  }`;

  return (
    <header className={headerClassName}>
      <nav className="header__nav header__nav_left">
        <NavLink to="/" className="header__logo"></NavLink>
        <NavLink
          to="/movies"
          className={`${
            location.pathname === "/movies"
              ? navLinkMoviesTheme + " header__nav-link_active"
              : navLinkMoviesTheme
          }`}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={`${
            location.pathname === "/saved-movies"
              ? navLinkMoviesTheme + " header__nav-link_active"
              : navLinkMoviesTheme
          }`}
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <nav className="header__nav header__nav_right">
        <NavLink to="/signup" className={navLinkMainClassName}>
          Регистрация
        </NavLink>
        <NavLink to="/signin" className={navLinkSigninClassName}>
          Войти
        </NavLink>
      </nav>
      <Link to="/profile" className={navLinkAccountTheme}>
        <img
          src={isMain ? icon_dark : icon}
          className="header__icon"
          alt="Иконка"
        ></img>
        Аккаунт
      </Link>
      <button
        name="burger"
        className={burgerClassName}
        onClick={handleBurgerMenu}
        type="button"
      ></button>
      <PopupMenu
        onBurgerMenu={isBurgerMenu}
        onClose={handleBurgerMenu}
      ></PopupMenu>
    </header>
  );
}

export default Header;
