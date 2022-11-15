import "../page/index.css";
import { Link } from "react-router-dom";
import { useValieInput } from "./ValidationForm";
import useValidationServerStatus from "./ValidationServerStatus";

function Register(props) {
  const classNameText = "register__form-error";
  const errText = useValidationServerStatus(props.errStatus);
  const name = useValieInput(
    "",
    {
      isMaxLength: 30,
      isEmpty: false,
      isMinLength: 2,
    },
    classNameText
  );

  const email = useValieInput("", { isEmail: false }, classNameText);
  const password = useValieInput(
    "",
    { isEmpty: false, isMinLength: 6 },
    classNameText
  );

  function handleSubmitRegister(e) {
    e.preventDefault();
    if (!(name.isValidate || email.isValidate || password.isValidate)) {
      props.onSubmit(name.value, email.value, password.value);
    }
  }
  return (
    <div className="page">
      <main className="register">
        <Link className="register__logo" to="/"></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="register__form"
          onSubmit={handleSubmitRegister}
          noValidate
        >
          <h2 className="register__form-title">Имя</h2>
          <input
            className={name.inputClassName}
            type="text"
            name="name"
            onChange={(e) => name.handleChange(e)}
            value={name.value || ""}
            onFocus={() => name.onFocus()}
            required
          ></input>
          <span className={name.errorSpanClassName}>{name.errorText}</span>
          <h2 className="register__form-title">E-mail</h2>
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
          <h2 className="register__form-title">Пароль</h2>
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
          <span className="register__server-error">{errText}</span>
          <button
            disabled={
              name.isValidate || email.isValidate || password.isValidate
            }
            type="submit"
            className="register__form-button"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Register;
