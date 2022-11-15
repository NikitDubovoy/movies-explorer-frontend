import "../page/index.css";

function SearchForm(props) {
  function handleSubmitSearch(e) {
    e.preventDefault();
    props.onSubmit(props.movies, props.setSearchMovie);
  }

  return (
    <form className="search-form" onSubmit={(e) => handleSubmitSearch(e)}>
      <input
        className="search-form__input"
        placeholder="Фильм"
        type="text"
        name="search"
        onChange={(e) => props.handleSearchValue(e)}
        value={props.valueSearch || ""}
      ></input>
      <button type="submit" className="search-form__button">
        Найти
      </button>
      <label className="search-form__label-text">
        <input
          type="checkbox"
          onClick={(e) => handleSubmitSearch(e)}
          className="search-form__checkbox"
          onChange={props.onCheckbox}
          checked={props.checked}
        />
        <div className="search-form__checkbox-checkmark"></div>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
