import SearchForm from '../SearchForm/SearchForm';
import movie1 from '../../images/movie1.png';
import movie2 from '../../images/movie2.png';
import movie3 from '../../images/movie3.png';
import movie4 from '../../images/movie4.png';
import movie5 from '../../images/movie5.png';
import movie6 from '../../images/movie6.png';
import movie7 from '../../images/movie7.png';
import movie8 from '../../images/movie8.png';
import movie9 from '../../images/movie9.png';
import movie10 from '../../images/movie10.png';
import movie11 from '../../images/movie11.png';
import movie12 from '../../images/movie12.png';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMore from '../LoadMore/LoadMore';
import './Movies.css';

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
  {
    name: 'Баския: Взрыв Реальности',
    img: movie4,
    alt: 'Баския: Взрыв Реальности',
    time: '1ч 21м',
    like: false,
  },
  {
    name: 'Бег это свобода',
    img: movie5,
    alt: 'Бег это свобода',
    time: '1ч 44м',
    like: false,
  },
  {
    name: 'Книготорговцы',
    img: movie6,
    alt: 'Книготорговцы',
    time: '1ч 37м',
    like: true,
  },
  {
    name: 'Когда я думаю о Германии ночью',
    img: movie7,
    alt: 'Когда я думаю о Германии ночью',
    time: '1ч 56м',
    like: false,
  },
  {
    name: 'Gimme Danger: История Игги и The Stooge...',
    img: movie8,
    alt: 'Gimme Danger: История Игги и The Stooge...',
    time: '1ч 59м',
    like: false,
  },
  {
    name: 'Дженис: Маленькая девочка грустит',
    img: movie9,
    alt: 'Дженис: Маленькая девочка грустит',
    time: '1ч 42м',
    like: true,
  },
  {
    name: 'Соберись перед прыжком',
    img: movie10,
    alt: 'Соберись перед прыжком',
    time: '1ч 10м',
    like: true,
  },
  {
    name: 'Пи Джей Харви: A dog called money',
    img: movie11,
    alt: 'Пи Джей Харви: A dog called money',
    time: '1ч 4м',
    like: false,
  },
  {
    name: 'По волнам: Искусство звука в кино',
    img: movie12,
    alt: 'По волнам: Искусство звука в кино',
    time: '1ч 7м',
    like: false,
  },
];

const Movies = () => {

  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList array={movies}/>
      <LoadMore />
    </main>
  );
};

export default Movies;
