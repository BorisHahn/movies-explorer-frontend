import { React } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

const Profile = () => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser?.name}!</h1>
      <form className='profile__form'>
        <fieldset className='profile__fieldset'>
          <div className='profile__container'>
            <label className='profile__label'>Имя</label>
            <input className='profile__input' id='name' value='Борис'></input>
          </div>
          <div className='profile__container'>
            <label className='profile__label'>E-mail</label>
            <input
              className='profile__input'
              id='email'
              value='pochta@yandex.ru'
            ></input>
          </div>
        </fieldset>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_exit'>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
};

export default Profile;
