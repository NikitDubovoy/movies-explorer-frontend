import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header leftNav={true} isSaved={true} />
      <SearchForm />
      <MoviesCardList isSaved={true} />
      <button className="movies-card-list__button-more">Ещё</button>
      <Footer />
    </section>
  );
}

export default SavedMovies;
