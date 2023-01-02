import { useContext, useEffect, useState } from 'react';
import { React } from 'react';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { emailRegExp } from '../../utils/constants';
import './Profile.css';

const Profile = ({ handleEditProfileInfo, handleLogout, message }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isSameUserValue, setIsSameUserValue] = useState(false);
  const { values, handleChangeValid, errors, isValid, resetForm } =
    useFormAndValidation();
  const classErrorMessage = message
    ? 'profile__message profile__message_active'
    : 'profile__message';

  useEffect(() => {
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setIsSameUserValue(true);
    } else {
      setIsSameUserValue(false);
    }
  }, [values?.name, values?.email]);

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  const handleChange = (e) => {
    e.preventDefault();
    handleEditProfileInfo(values);
  };

  const logOut = (e) => {
    e.preventDefault();
    handleLogout();
  };

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleChange}>
        <fieldset className='profile__fieldset'>
          <div className='profile__container'>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input
              className='profile__input'
              minLength='3'
              onChange={handleChangeValid}
              id='name'
              name='name'
              type='text'
              value={values.name || ''}
              placeholder='Имя'
              required
              autoComplete="username"
            ></input>
          </div>
          <span className='profile__error'>{errors.name}</span>
          <div className='profile__container'>
            <label className='profile__label' htmlFor='E-mail'>
              E-mail
            </label>
            <input
              type='email'
              name='email'
              id='email'
              pattern={emailRegExp}
              className='profile__input'
              onChange={handleChangeValid}
              value={values.email || ''}
              placeholder='E-mail'
              required
              autoComplete="current-password"
            ></input>
          </div>
          <span className='profile__error'>{errors.email}</span>
        </fieldset>
        <span className={classErrorMessage}>{message}</span>
        <button
          className='profile__button'
          disabled={!isValid || !isSameUserValue}
        >
          Редактировать
        </button>
        <button
          type='button'
          className='profile__button profile__button_exit'
          onClick={logOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
};

export default Profile;
