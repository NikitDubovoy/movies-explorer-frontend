import "../page/index.css";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import MoviesCardList from "./MoviesCardList";
import React from "react";

function SavedMovies(props) {
  React.useState(() => {
    props.getSaveMovies();
  });

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="saved-movies">
        <SearchForm
          checked={props.saveSearchChecked}
          onCheckbox={props.handleSaveSearchChecked}
          handleSearchValue={props.handleSaveSearchValue}
          onSubmit={props.onSubmitSearch}
          movies={props.saveMovies}
          setSearchMovie={props.setSaveSearchMovies}
          valueSearch={props.saveSearchValue}
          getSaveMovies={props.getSaveMovies}
        />
        <MoviesCardList
          onDeletedMovies={props.onDeletedMovie}
          saveMovies={props.saveMovies}
          idUser={props.idUser}
          onSavedMovies={props.onSavedMovies}
          onButton={props.onButtonMore}
          counter={props.saveMovies.length}
          isContent={props.isContent}
          movies={
            props.saveSearchMovies.length != 0
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
