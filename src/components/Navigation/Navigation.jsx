import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
const Navigation = ({ loggedIn, hideOnMobile = false }) => {
  const location = useLocation();

  const navigationClass = loggedIn
    ? 'navigation'
    : 'navigation navigation_hide';
  const moviesClass =
    location.pathname === '/movies'
      ? 'navigation__movies navigation__movies_active'
      : 'navigation__movies';
  const savedMoviesClass =
    location.pathname === '/saved-movies'
      ? 'navigation__movies navigation__movies_active'
      : 'navigation__movies';
  const mainClass =
    location.pathname === '/'
      ? 'navigation__main navigation__main_active'
      : 'navigation__main';
  return (
    <>
      <ul
        className={
          navigationClass + (hideOnMobile ? ' navigation_mobile-on' : '')
        }
      >
        <li>
          <Link className={mainClass} to='/' title='Главная'>
            Главная
          </Link>
        </li>
        <li>
          <Link className={moviesClass} to='/movies' title='Фильмы'>
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            className={savedMoviesClass}
            to='/saved-movies'
            title='Сохраненные фильмы'
          >
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
