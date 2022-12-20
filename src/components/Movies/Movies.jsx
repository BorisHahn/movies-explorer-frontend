import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMore from '../LoadMore/LoadMore';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({
  movies,
  searchText,
  setSearchText,
  shortFilmFlag,
  setShortFilmFlag,
  onSubmit,
  isloading,
  addMovieToSavedMovies,
  deleteMovieFromSavedMovies,
}) => {
  return (
    <main className='movies'>
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        shortFilmFlag={shortFilmFlag}
        setShortFilmFlag={setShortFilmFlag}
        onSubmit={onSubmit}
      />
      {isloading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          addMovie={addMovieToSavedMovies}
          deleteMovie={deleteMovieFromSavedMovies}
        />
      )}

      <LoadMore />
    </main>
  );
};

export default Movies;
