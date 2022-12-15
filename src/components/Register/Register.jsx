import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import './Register.css';
import logo from '../../images/logo.svg';
import { emailRegExp } from '../../utils/constants';

const Register = ({ handleRegister, message }) => {
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  const isValidInput = isValid ? 'register__input' : 'register__input register__input_error';

  const handleChange = (e) => {
    e.preventDefault();
    handleRegister(values);
    console.log(values);
  };

  return (
    <main className='register'>
      <div className='register__wrapper'>
        <Link to='/'>
          <img className='register__logo' src={logo} alt='Логотип' />
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleChange}>
          <fieldset className='register__fieldset'>
            <div className='register__container'>
              <label className='register__label' htmlFor='name'>Имя</label>
              <input
                className={isValidInput}
                minLength='3'
                onChange={handleChangeValid}
                id='name'
                name='name'
                type='text'
                value={values.name || ''}
                required
              ></input>
              <span className='register__error'>{errors.name}</span>
            </div>
            <div className='register__container'>
              <label className='register__label' htmlFor='E-mail'>E-mail</label>
              <input
                type='email'
                name='email'
                id='email'
                pattern={emailRegExp}
                className={isValidInput}
                onChange={handleChangeValid}
                value={values.email || ''}
                required
                autoComplete='off'
              ></input>
              <span className='register__error'>{errors.email}</span>
            </div>
            <div className='register__container'>
              <label className='register__label' htmlFor='password'>Пароль</label>
              <input
                name='password'
                type='password'
                id='password'
                className={isValidInput}
                onChange={handleChangeValid}
                minLength='6'
                value={values.password || ''}
                required
              ></input>
              <span className='register__error '>{errors.password}</span>
            </div>
          </fieldset>
          <span>{message}</span>
          <button className='register__button' disabled={!isValid}>Зарегестрироваться</button>
          <p className='register__text'>
            Уже зарегестрированы?{' '}
            <Link className='register__link' to='/signin'>
              Войти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
