import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function Movies() {
  return (
    <section className="movies">
      <Header leftNav={true} />
      <SearchForm />
      <MoviesCardList />
      <button className="movies-card-list__button-more">Ещё</button>
      <Footer />
    </section>
  );
}

export default Movies;
