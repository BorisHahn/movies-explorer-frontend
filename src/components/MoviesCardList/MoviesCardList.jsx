import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, addMovie, deleteMovie }) => {
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
  return <ul className='movies-list'>{cards}</ul>;
};

export default MoviesCardList;
