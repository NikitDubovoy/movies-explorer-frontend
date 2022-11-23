import React from "react";
import "../page/index.css";
import Header from "./Header";
import { useValieInput } from "./ValidationForm";
import useValidationServerStatus from "./ValidationServerStatus";
import { UserContext } from "../context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(UserContext);
  const [userName, setUserName] = React.useState(currentUser.name);
  const [userEmail, setUserEmail] = React.useState(currentUser.email);
  const [readOnlyName, setReadOnlyName] = React.useState(false);
  const [readOnlyEmail, setReadOnlyEmail] = React.useState(false);
  const [classNameServerMessage, setClassNameServerMessage] =
    React.useState("");
  const serverMessage = useValidationServerStatus(props.errStatus);
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

  React.useEffect(() => {
    props.setErrStatus(null);
  }, [props.errStatus]);

  React.useEffect(() => {
    if (props.errStatus === 200 || props.errStatus === null) {
      setClassNameServerMessage("profile__success");
    } else {
      setClassNameServerMessage("profile__server-error");
    }
  }, [props.errStatus]);

  const name = useValieInput(
    currentUser.name || "",
    {
      isMaxLength: 30,
      isMinLength: 2,
      isValueEquality: currentUser.name,
    },
    classNameText
  );
  const email = useValieInput(
    userEmail || "",
    {
      isValueEquality: userEmail,
      isEmail: false,
    },
    classNameText
  );
  React.useEffect(() => {
    if (userName !== name.value) {
      setReadOnlyEmail(true);
    }
    if (userEmail !== email.value) {
      setReadOnlyName(true);
    }
  }, [name.value, email.value]);

  React.useEffect(() => {
    if (email.value !== userEmail || name.value !== userName) {
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
  }
  return (
    <div className="page">
      <main className="profile">
        <Header isLoggedIn={props.isLoggedIn} />
        <form
          className="profile__form"
          onSubmit={(e) => handleSubmitProfile(e)}
        >
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              className="profile__input"
              onChange={(e) => name.handleChange(e)}
              value={name.value || ""}
              type="text"
              name="nameUser"
              onFocus={() => name.onFocus()}
              readOnly={readOnlyName}
            ></input>
            <span className={name.errorSpanClassName}>
              {!readOnlyName ? name.errorText : ""}
            </span>
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
              readOnly={readOnlyEmail}
            ></input>
            <span className={email.errorSpanClassName}>
              {!readOnlyEmail ? email.errorText : ""}
            </span>
          </label>
          <span className={classNameServerMessage}>{serverMessage}</span>
          <button
            type="submit"
            className={buttonClassName}
            disabled={name.isValidate && email.isValidate}
          >
            Редактировать
          </button>
          <button
            type="submit"
            disabled={name.isValidate && email.isValidate}
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
