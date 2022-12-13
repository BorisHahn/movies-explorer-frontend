import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Register.css';
const Register = () => {
  return (
    <main className='register'>
      <div className='register__wrapper'>
        <Link to='/'>
          <img className='register__logo' src={logo} alt='Логотип' />
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <fieldset className='register__fieldset'>
            <div className='register__container'>
              <label className='register__label'>Имя</label>
              <input
                className='register__input'
                minLength='2'
                maxLength='40'
                value='Борис'
                required
              ></input>
              <span className='register__error'></span>
            </div>
            <div className='register__container'>
              <label className='register__label'>E-mail</label>
              <input
                type='email'
                className='register__input'
                minLength='8'
                maxLength='32'
                value='pochta@yandex.ru'
                required
              ></input>
              <span className='register__error'></span>
            </div>
            <div className='register__container'>
              <label className='register__label'>Пароль</label>
              <input
                type='password'
                className='register__input register__input_error'
                minLength='5'
                maxLength='40'
                value='1234567'
                required
              ></input>
              <span className='register__error '>Что-то пошло не так...</span>
            </div>
          </fieldset>
          <button className='register__button'>Зарегестрироваться</button>
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
