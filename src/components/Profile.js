import "../page/index.css";
import Header from "./Header";

function Profile() {
  return (
    <section className="profile">
      <Header leftNav={true} isSaved={true} />
      <form className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <label className="profile__label">
          <span className="profile__label-text">Имя</span>
          <input className="profile__input" value="Виталий"></input>
        </label>
        <label className="profile__label">
          <span className="profile__label-text">E-mail</span>
          <input className="profile__input"></input>
        </label>
        <button className="profile__button">Редактировать</button>
        <button className="profile__button_exit profile__button">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
