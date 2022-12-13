import { Link } from 'react-router-dom';
import './ProfileButton.css';
const ProfileButton = ({loggedIn, hideOnMobile=false}) => {
  const visibility = loggedIn
    ? 'profile-button'
    : 'profile-button profile-button_hide';
  return (
    <>
      <Link className={visibility + (hideOnMobile ? ' profile-button_mobile-on' : '')} to='/profile'>
        <p className='profile-button__text'>Аккаунт</p>
        <div className='profile-button__logo'></div>
      </Link>
    </>
  );
};

export default ProfileButton;
