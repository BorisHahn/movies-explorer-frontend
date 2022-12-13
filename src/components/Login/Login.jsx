import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';
const Login = () => {
  return (
    <main className='login'>
      <div className='login__wrapper'>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='Логотип' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form'>
          <fieldset className='login__fieldset'>
            <div className='login__container'>
              <label className='login__label'>E-mail</label>
              <input
                type='email'
                className='login__input'
                minLength='5'
                maxLength='40'
                value='pochta@yandex.ru'
                required
              ></input>
              <span className='login__error'></span>
            </div>
            <div className='login__container'>
              <label className='login__label'>Пароль</label>
              <input
                type='password'
                className='login__input'
                minLength='8'
                maxLength='32'
                value='12345678'
                required
              ></input>
              <span className='login__error'></span>
            </div>
          </fieldset>
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
