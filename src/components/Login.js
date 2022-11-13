import "../page/index.css";
import { Link } from "react-router-dom";
import { useValieInput } from "./ValidationForm";
import useValidationServerStatus from "./ValidationServerStatus";

function Login(props) {
  const classNameText = "register__form-error";
  const errText = useValidationServerStatus(props.errStatus);

  const email = useValieInput("", { isEmail: false }, classNameText);
  const password = useValieInput(
    "",
    { isEmpty: false, isMinLength: 6 },
    classNameText
  );

  function handleSubmitLogin(e) {
    e.preventDefault();
    if (!(email.isValidate || password.isValidate)) {
      props.onSubmit(email.value, password.value);
    }
  }

  return (
    <div className="page">
      <main className="login">
        <Link className="login__logo" to="/"></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmitLogin} noValidate>
          <h2 className="login__form-title">E-mail</h2>
          <input
            className={email.inputClassName}
            type="email"
            name="email"
            onChange={(e) => email.handleChange(e)}
            value={email.value || ""}
            onFocus={() => email.onFocus()}
            required
          ></input>
          <span className={email.errorSpanClassName}>{email.errorText}</span>
          <h2 className="login__form-title">Пароль</h2>
          <input
            className={password.inputClassName}
            type="password"
            name="password"
            onChange={(e) => password.handleChange(e)}
            value={password.value || ""}
            onFocus={() => password.onFocus()}
            required
          ></input>
          <span className={password.errorSpanClassName}>
            {password.errorText}
          </span>
          <span className="login__server-error">{errText}</span>
          <button
            disabled={email.isValidate || password.isValidate}
            className="login__form-button"
            type="submit"
          >
            Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
