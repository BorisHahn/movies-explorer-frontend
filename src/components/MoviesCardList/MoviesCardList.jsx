import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, addMovie, deleteMovie, emptyBannerVisible }) => {
  const cards = movies.map((item, index) => {
    return (
      <MoviesCard
        card={item}
        key={index}
        addMovie={addMovie}
        deleteMovie={deleteMovie}
      />
    );
  });
  return (
    <ul className='movies-list'>
      {movies.length === 0 && emptyBannerVisible ? (
        <span className='movie-list__banner'>Ничего не найдено!</span>
      ) : (
        cards
      )}
    </ul>
  );
};

export default MoviesCardList;
