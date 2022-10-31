import "../page/index.css";
import logo from "../images/Header/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <img className="login__logo" src={logo} alt="Логотип"></img>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" method="POST">
        <h2 className="login__form-title">E-mail</h2>
        <input className="login__form-input" type="email" name="email"></input>
        <h2 className="login__form-title">Пароль</h2>
        <input
          className="login__form-input"
          type="password"
          name="password"
        ></input>
        <span className="login__form-error"></span>
        <button className="login__form-button">Войти</button>
      </form>
      <p className="login__text">
        Ещё не зарегистрированы?{" "}
        <Link to="/signup" className="login__link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
