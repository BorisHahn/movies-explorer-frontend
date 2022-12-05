import { Link, useLocation, useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const headerClass =
    location.pathname === '/' ? 'header header_main' : 'header';
  const navigationClass =
    location.pathname === '/movies' || location.pathname === '/saved-movies'
      ? 'header__navigation'
      : 'header__navigation header__navigation_hide';
  const moviesClass =
    location.pathname === '/movies'
      ? 'header__movies active'
      : 'header__movies';
  const savedMoviesClass =
    location.pathname === '/saved-movies'
      ? 'header__movies active'
      : 'header__movies';
  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </Link>
      <ul className={navigationClass}>
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
      <Link className='header__profile' to='/profile'>
        <p className='header__profile-text'>Аккаунт</p>
        <div className='header__profile-logo'></div>
      </Link>
    </header>
  );
};
export default Header;
