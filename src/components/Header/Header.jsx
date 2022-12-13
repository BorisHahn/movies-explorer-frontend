import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import hamburger from '../../images/hamburger.svg';
import closeHamburger from '../../images/close-hamburger.svg';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Header.css';

const Header = ({ loggedIn, handleHamburgerMenu, hamburgerMenu }) => {
  const location = useLocation();
  let headerClass = '';
  if (location.pathname === '/') {
    headerClass = 'header header_main';
  } else if (
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies' ||
    location.pathname === '/profile'
  ) {
    headerClass = 'header';
  } else {
    headerClass = 'header_hide';
  }
  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </Link>
      <Navigation loggedIn={loggedIn} hideOnMobile={true} />
      <ProfileButton loggedIn={loggedIn} hideOnMobile={true} />
      {!loggedIn ? (
        <ul className='header__authentication'>
          <li>
            <Link className='header__registr' to='/signup'>
              Регистрация
            </Link>
          </li>
          <li>
            <Link className='header__signin' to='/signin'>
              Войти
            </Link>
          </li>
        </ul>
      ) : (
        <img
          className='header__burger'
          src={hamburger}
          alt='hamburger'
          onClick={() => handleHamburgerMenu()}
        ></img>
      )}
    </header>
  );
};
export default Header;
