import { useLocation } from 'react-router-dom';
import likeDisabled from '../../images/like-disabled.svg';
import like from '../../images/like.svg';
import deleteMovieImg from '../../images/delete-movie.svg';
import './MoviesCard.css';

const MoviesCard = ({ card, addMovie, deleteMovie }) => {
  const location = useLocation();

  const handleAdd = (card) => {
    if (card.isLiked) {
      deleteMovie(card.movieId);
    } else {
      addMovie(card.movieId);
    }
  };

  const handleDelete = (card) => {
    deleteMovie(card.movieId);
  };

  const likeVisibility =
    location.pathname === '/movies'
      ? 'movies-item__like'
      : 'movies-item__like_hide';

  const deleteVisibility =
    location.pathname === '/saved-movies'
      ? 'movies-item__delete'
      : 'movies-item__delete_hide';

  const wrapperVisibility =
    location.pathname === '/saved-movies'
      ? 'movies-item__wrapper_saved'
      : 'movies-item__wrapper';

  const likeState = card.isLiked ? like : likeDisabled;
  return (
    <li className='movies-item'>
      <a href={card.trailerLink} target='_blank'>
        <img
          className='movies-item__photo'
          src={card.image}
          alt={card.alt}
        ></img>
      </a>
      <div className={wrapperVisibility}>
        <h2 className='movies-item__title' title={card.nameEN}>
          {card.nameRU}
        </h2>
        <img
          className={likeVisibility}
          src={likeState}
          alt='like'
          onClick={() => handleAdd(card)}
        ></img>
        <img
          className={deleteVisibility}
          src={deleteMovieImg}
          onClick={() => handleDelete(card)}
          alt='delete'
        ></img>
      </div>
      <p className='movies-item__time'>{card.duration} мин.</p>
    </li>
  );
};

export default MoviesCard;
