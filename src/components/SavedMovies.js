import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function SavedMovies() {
  return (
    <div className="page">
      <Header leftNav={true} isSaved={true} />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList isSaved={true} />
        <button
          type="button"
          className="movies-card-list__button-more movies-card-list__button-more_active"
        >
          Ещё
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
