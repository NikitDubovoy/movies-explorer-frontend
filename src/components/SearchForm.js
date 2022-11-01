import "../page/index.css";

function SearchForm() {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        placeholder="Фильм"
        type="text"
      ></input>
      <button type="button" className="search-form__button">
        Найти
      </button>
      <label className="search-form__label-text">
        <input type="checkbox" className="search-form__checkbox" />{" "}
        <div class="search-form__checkbox-checkmark"></div>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
