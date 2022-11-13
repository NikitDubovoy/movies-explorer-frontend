import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";

function SavedMovies(props) {
  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="saved-movies">
        <SearchForm
          checked={props.isCheckdox}
          onValue={props.onValueSearh}
          onCheckbox={props.onValueCheckbox}
          onSubmit={props.onSubmitSearch}
          movies={props.saveMovies}
          setSearchMovie={props.setSaveSearchMovies}
        />
        <MoviesCardList
          onDeletedMovies={props.onDeletedMovie}
          saveMovies={props.saveMovies}
          idUser={props.idUser}
          onSavedMovies={props.onSavedMovies}
          onButton={props.onButtonMore}
          counter={props.saveMovies.length}
          isContent={props.isContent}
          saveSearchMovies={props.saveSearchMovies}
          movies={
            props.saveSearchMovies.length > 0
              ? props.saveSearchMovies
              : props.saveMovies
          }
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
