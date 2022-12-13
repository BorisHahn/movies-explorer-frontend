import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({array}) => {
  const cards = array.map((item, index) => {
    return (
      <MoviesCard card={item} key={index} />
    )
  })
  return (
    <ul className='movies-list'>
      {cards}
    </ul>
  );
};

export default MoviesCardList;
