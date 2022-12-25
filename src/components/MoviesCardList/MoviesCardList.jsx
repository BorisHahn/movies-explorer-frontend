import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, addMovie, deleteMovie, isNothingFind }) => {
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
      {isNothingFind ? <span className='movie-list__banner'>Ничего не найдено!</span> : cards}
    </ul>
  );
};

export default MoviesCardList;
