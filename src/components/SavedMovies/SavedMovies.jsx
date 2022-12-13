import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movie1 from '../../images/movie1.png';
import movie2 from '../../images/movie2.png';
import movie3 from '../../images/movie3.png';
import './SavedMovies.css';

const SavaedMovies = () => {
  const movies = [
    {
      name: '33 слова о дизайне',
      img: movie1,
      alt: '33 слова о дизайне',
      time: '1ч 47м',
      like: true,
    },
    {
      name: 'Киноальмонах "100 лет дизайна"',
      img: movie2,
      alt: 'Киноальмонах "100 лет дизайна"',
      time: '1ч 3м',
      like: false,
    },
    {
      name: 'В погоне за Бэнкси',
      img: movie3,
      alt: 'В погоне за Бэнкси',
      time: '1ч 42м',
      like: false,
    },
  ];
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList array={movies} />
    </main>
  );
};

export default SavaedMovies;
