import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavaedMovies = ({
  searchText,
  setSearchText,
  shortFilmFlag,
  setShortFilmFlag,
}) => {
  return (
    <main className='saved-movies'>
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        shortFilmFlag={shortFilmFlag}
        setShortFilmFlag={setShortFilmFlag}
      />
      <MoviesCardList />
    </main>
  );
};

export default SavaedMovies;
