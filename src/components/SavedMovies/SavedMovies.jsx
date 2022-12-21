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
}) => {
  return (
    <main className='saved-movies'>
      <SearchForm message={message} setMessage={setMessage} />
      {isloading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          deleteMovie={deleteMovieFromSavedMovies}
        />
      )}
    </main>
  );
};

export default SavedMovies;
