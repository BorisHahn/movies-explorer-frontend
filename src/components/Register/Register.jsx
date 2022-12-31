import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import './Register.css';
import logo from '../../images/logo.svg';
import { emailRegExp } from '../../utils/constants';

const Register = ({ handleRegister, message }) => {
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  const isValidInput = isValid
    ? 'register__input'
    : 'register__input register__input_error';
  const classErrorMessage = message
    ? 'register__message register__message_active'
    : 'register__message';
  const handleChange = (e) => {
    e.preventDefault();
    handleRegister(values);
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
              <label className='register__label' htmlFor='name'>
                Имя
              </label>
              <input
                className='register__input'
                minLength='3'
                onChange={handleChangeValid}
                id='name'
                name='name'
                type='text'
                value={values.name || ''}
                autoComplete='off'
                required
              ></input>
              <span className='register__error'>{errors.name}</span>
            </div>
            <div className='register__container'>
              <label className='register__label' htmlFor='E-mail'>
                E-mail
              </label>
              <input
                type='email'
                name='email'
                id='email'
                pattern={emailRegExp}
                className='register__input'
                onChange={handleChangeValid}
                value={values.email || ''}
                autoComplete='off'
                required
              ></input>
              <span className='register__error'>{errors.email}</span>
            </div>
            <div className='register__container'>
              <label className='register__label' htmlFor='password'>
                Пароль
              </label>
              <input
                name='password'
                type='password'
                id='password'
                className={isValidInput}
                onChange={handleChangeValid}
                minLength='6'
                value={values.password || ''}
                autoComplete='new-password'
                required
              ></input>
              <span className='register__error '>{errors.password}</span>
            </div>
          </fieldset>
          <span className={classErrorMessage}>{message}</span>
          <button className='register__button' disabled={!isValid}>
            Зарегестрироваться
          </button>
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
