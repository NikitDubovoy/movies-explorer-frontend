import "../page/index.css";
import logo from "../images/Header/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <img className="register__logo" src={logo} alt="Логотип"></img>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" method="POST">
        <h2 className="register__form-title">Имя</h2>
        <input className="register__form-input" type="text" name="name"></input>
        <h2 className="register__form-title">E-mail</h2>
        <input
          className="register__form-input"
          type="email"
          name="email"
        ></input>
        <h2 className="register__form-title">Пароль</h2>
        <input
          className="register__form-input"
          type="password"
          name="password"
        ></input>
        <span className="register__form-error">Что-то пошло не так...</span>
        <button className="register__form-button">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
