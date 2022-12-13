import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import closeHamburger from '../../images/close-hamburger.svg';
import './HamburgerMenu.css';
const HamburgerMenu = ({ handleHamburgerMenu, hamburgerMenu, loggedIn }) => {
  const visibility = hamburgerMenu
    ? 'hamburger-menu hamburger-menu_opened'
    : 'hamburger-menu';
  return (
    <div className={visibility}>
      <img className='hamburger-menu__close' src={closeHamburger} alt='close' onClick={() => handleHamburgerMenu()}></img>
      <Navigation loggedIn={loggedIn}/>
      <ProfileButton loggedIn={loggedIn}/>
    </div>
  );
};

export default HamburgerMenu;
