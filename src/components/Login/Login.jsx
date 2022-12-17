import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import logo from '../../images/logo.svg';
import './Login.css';
const Login = ({ handleLogin, message }) => {
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  const isValidInput = isValid ? 'login__input' : 'login__input login__input_error';
  const classErrorMessage = message ? 'login__message login__message_active' : 'login__message';

  const handleChange = (e) => {
    e.preventDefault();
    handleLogin(values);
  };
  return (
    <main className='login'>
      <div className='login__wrapper'>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='Логотип' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form' onSubmit={handleChange}>
          <fieldset className='login__fieldset'>
            <div className='login__container'>
              <label className='login__label' htmlFor='E-mail'>E-mail</label>
              <input
                className='login__input'
                minLength='3'
                onChange={handleChangeValid}
                type='email'
                name='email'
                id='email'
                value={values.email || ''}
                required
                autoComplete='off'
              ></input>
              <span className='login__error'>{errors.email}</span>
            </div>
            <div className='login__container'>
              <label className='login__label' htmlFor='password'>Пароль</label>
              <input
                name='password'
                type='password'
                id='password'
                onChange={handleChangeValid}
                className={isValidInput}
                minLength='6'
                value={values.password || ''}
                required
              ></input>
              <span className={classErrorMessage}>{errors.password}</span>
            </div>
          </fieldset>
          <span className={classErrorMessage}>{message}</span>
          <button className='login__button'>Войти</button>
          <p className='login__text'>
            Ещё не зарегистрированы?{' '}
            <Link className='login__link' to='/signup'>
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
