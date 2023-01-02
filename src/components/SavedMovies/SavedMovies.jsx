import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

const SavedMovies = ({
  movies,
  deleteMovieFromSavedMovies,
  isloading,
  message,
  setMessage,
  searchText,
  setSearchText,
  shortFilmFlag,
  setShortFilmFlag,
  onSubmit,
  emptyBannerVisible
}) => {
  return (
    <main className='saved-movies'>
      <SearchForm
        message={message}
        setMessage={setMessage}
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
          deleteMovie={deleteMovieFromSavedMovies}
          emptyBannerVisible={emptyBannerVisible}
        />
      )}
    </main>
  );
};

export default SavedMovies;
