import React from "react";
import "../page/index.css";
import { Link } from "react-router-dom";
import PopupMenu from "./PopupMenu";

import logo from "../images/Header/logo.svg";
import icon from "../images/Header/icon.svg";

function Header(props) {
  const isMain = props.main;
  const isLeftNav = props.leftNav;
  const isSaved = props.isSaved;

  const [isBurgerMenu, setBurgerMenu] = React.useState(false);

  function handleBurgerMenu() {
    setBurgerMenu(!isBurgerMenu);
  }

  const navLinkMainClassName = `${
    isMain ? "header__nav-link header__nav-link_main" : "header__nav-link"
  }`;

  const navLinkMoviesClassName = `${
    isLeftNav ? "header__nav-link header__nav-link_active" : "header__nav-link"
  }`;

  const headerClassName = `${isMain ? "header header_dark-theme" : "header"}`;

  const navLinkSavedClassName = `${
    isSaved ? navLinkMoviesClassName : "header__nav-link"
  }`;

  const navLinkSigninClassName = `header__nav-link_signin ${navLinkMainClassName}`;
  const navLinkAccountClassName = `${
    isMain ? "header__account" : "header__account header__account_active"
  }`;

  const burgerClassName = `${
    isMain ? "header__burger" : "header__burger header__burger_active"
  }`;

  return (
    <header className={headerClassName}>
      <nav className="header__nav header__nav_left">
        <img src={logo} className="header__logo" alt="Логотип"></img>
        <Link to="/movies" className={navLinkMoviesClassName}>
          Фильмы
        </Link>
        <Link to="/saved-movies" className={navLinkSavedClassName}>
          Сохранённые фильмы
        </Link>
      </nav>
      <nav className="header__nav header__nav_right">
        <Link to="/signup" className={navLinkMainClassName}>
          Регистрация
        </Link>
        <Link to="/signin" className={navLinkSigninClassName}>
          Войти
        </Link>
      </nav>
      <Link to="/profile" className={navLinkAccountClassName}>
        <img src={icon} className="header__icon" alt="Иконка"></img>
        Аккаунт
      </Link>
      <button
        name="burger"
        className={burgerClassName}
        onClick={handleBurgerMenu}
      ></button>
      <PopupMenu
        onBurgerMenu={isBurgerMenu}
        onClose={handleBurgerMenu}
      ></PopupMenu>
    </header>
  );
}

export default Header;
