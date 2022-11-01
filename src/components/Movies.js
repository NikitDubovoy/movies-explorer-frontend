import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function Movies() {
  return (
    <div className="page">
      <Header leftNav={true} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
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

export default Movies;
