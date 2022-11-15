import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function Movies(props) {
  const searchMovies = JSON.parse(localStorage.getItem("newListMovie"));

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="movies">
        <SearchForm
          checked={props.isCheckbox}
          valueSearch={props.valueSearch}
          handleSearchValue={props.handleSearchValue}
          onCheckbox={props.onValueCheckbox}
          onSubmit={props.onSubmitSearch}
          movies={props.moviesList}
          setSearchMovie={props.setNewFilterList}
          nameLocalList="beatfilmSearchMovies"
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
          movies={searchMovies || props.newFilterList}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
