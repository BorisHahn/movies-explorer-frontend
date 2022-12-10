import { useLocation } from 'react-router-dom';
import movie from '../../images/movie.png';
import likeDisabled from '../../images/like-disabled.svg';
import like from '../../images/like.svg';
import deleteMovie from '../../images/delete-movie.svg';
import './MoviesCard.css';

const MoviesCard = () => {
  const location = useLocation();

  const likeVisibility = location.pathname === '/movies' ? 'movies-item__like' : 'movies-item__like_hide';
  const wrapperVisibility = location.pathname === '/saved-movies' ? 'movies-item__wrapper_saved' : 'movies-item__wrapper';
  return (
    <li className='movies-item'>
      <img className='movies-item__photo' src={movie} alt='movie'></img>
      <div className={wrapperVisibility}>
        <h2 className='movies-item__title'>33 слова о дизайне</h2>
        <img className={likeVisibility} src={likeDisabled} alt='like'></img>
        <img className='movies-item__delete' src={deleteMovie} alt='delete'></img>
      </div>
      <p className='movies-item__time'>1ч 47м</p>
    </li>
  );
};

export default MoviesCard;
