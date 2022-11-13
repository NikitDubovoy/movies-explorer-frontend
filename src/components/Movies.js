import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function Movies(props) {
  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="movies">
        <SearchForm
          checked={props.isCheckdox}
          onValue={props.onValueSearh}
          onCheckbox={props.onValueCheckbox}
          onSubmit={props.onSubmitSearch}
          movies={props.moviesList}
          setSearchMovie={props.setNewFilterList}
        />
        <MoviesCardList
          isPreloader={props.isPreloader}
          onDeletedMovies={props.onDeletedMovie}
          saveMovies={props.saveMovies}
          idUser={props.idUser}
          onSavedMovies={props.onSavedMovies}
          onButton={props.onButtonMore}
          counter={props.counter}
          isContent={props.isContent}
          movies={props.newFilterList}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
