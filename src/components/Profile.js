import React from "react";
import "../page/index.css";
import Header from "./Header";
import { useValieInput } from "./ValidationForm";
import useValidationServerStatus from "./ValidationServerStatus";
import { UserContext } from "../context/CurrentUserContext";

function Profile(props) {
  const user = React.useContext(UserContext);

  const serverMessage = useValidationServerStatus(props.errStatus);
  const classNameServerMessage = `${
    serverMessage === "Успешно" ? "profile__success" : "profile__server-error"
  }`;
  const classNameText = "profile__error";
  const [buttonClassName, setButtonClassName] = React.useState(
    "profile__button profile__button_active"
  );

  const [exitButtonClassName, setExitButtonClassName] = React.useState(
    "profile__button_exit"
  );
  const [saveButtonClassName, setSaveButtonClassName] = React.useState(
    "profile__button-save"
  );
  const [nameTitle, setNameTitle] = React.useState(user.name);

  const name = useValieInput(
    user.name || "",
    {
      isMaxLength: 30,
      isMinLength: 2,
      isValueEquality: user.name,
    },
    classNameText
  );
  const email = useValieInput(
    user.email || "",
    {
      isValueEquality: user.email,
      isEmail: false,
    },
    classNameText
  );
  React.useEffect(() => {
    if (email.value != user.email || name.value != user.name) {
      setButtonClassName("profile__button");
      setExitButtonClassName("profile__button");
      setSaveButtonClassName(
        "profile__button-save profile__button-save_active"
      );
    }
  }, [name.isFocus, name.isValidate, email.isFocus, email.isValidate]);

  function handleSubmitProfile(e) {
    e.preventDefault();
    props.onUpdateUser({
      email: email.value,
      name: name.value,
    });
    setNameTitle(name.value);
  }

  return (
    <div className="page">
      <main className="profile">
        <Header isLoggedIn={props.isLoggedIn} />
        <form className="profile__form" onSubmit={handleSubmitProfile}>
          <h2 className="profile__title">Привет, {nameTitle}!</h2>
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              className="profile__input"
              onChange={(e) => name.handleChange(e)}
              value={name.value || ""}
              type="text"
              name="nameUser"
              onFocus={() => name.onFocus()}
            ></input>
            <span className={name.errorSpanClassName}>{name.errorText}</span>
          </label>

          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              className="profile__input"
              onChange={(e) => email.handleChange(e)}
              value={email.value || ""}
              type="e-mail"
              name="emailUser"
              onFocus={() => email.onFocus()}
            ></input>
            <span className={email.errorSpanClassName}>{email.errorText}</span>
          </label>
          <span className={classNameServerMessage}>{serverMessage}</span>
          <button type="submit" className={buttonClassName}>
            Редактировать
          </button>

          <button
            type="submit"
            disabled={name.isValidate || email.isValidate}
            className={saveButtonClassName}
          >
            Сохранить
          </button>
          <button
            button="button"
            className={`${buttonClassName} ${exitButtonClassName}`}
            onClick={props.onLogout}
          >
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </div>
  );
}

export default Profile;
