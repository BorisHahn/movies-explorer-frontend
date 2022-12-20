import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import movieApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  //Информационное сообщение для пользователя
  const [message, setMessage] = useState('');
  //Фильмы Beatfilm
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  //Отфильтрованные фильмы Beatfilm
  const [filteredBeatfilmMovies, setFilteredBeatfilmMovies] = useState([]);
  //Сохраненные фильмы пользователя
  const [savedMovies, setSavedMovies] = useState([]);
  //Отфильтрованные сохрененные фильмы пользователя
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  //Состояние загрузки
  const [isloading, seIsloading] = useState(false);
  //Проверка на первый поиск фильмов
  const [firstSearch, setFirstSearch] = useState(false);

  const handleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  //Получение информации о пользователе

  const handleGetProfileInfo = () => {
    mainApi
      .getProfileInfo()
      .then((res) => {
        if (res.email) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate('/movies');
        }
      })
      .catch((e) => {
        checkAuthError(e);
      });
  };

  useEffect(() => {
    handleGetProfileInfo();
  }, []);

  //Создание учетной записи

  const handleRegister = ({ name, email, password }) => {
    mainApi
      .signUp({ name, email, password })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate('/movies');
        }
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Вход в учетную запись

  const handleLogin = ({ email, password }) => {
    mainApi
      .signIn({ email, password })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate('/movies');
        }
      })
      .then(() => {
        handleGetProfileInfo();
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Выход из учетной записи

  const handleLogout = () => {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser(null);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Редактирование данных пользователя

  const handleEditProfileInfo = ({ name, email }) => {
    mainApi
      .editProfileInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setMessage('Данные успешно обновлены!');
        setTimeout(() => setMessage(''), 5000);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Проверка на отсутствия авторизации

  const checkAuthError = (error) => {
    if (error.status === 401) {
      setIsLogin(false);
      setCurrentUser(null);
      navigate('/');
    }
  };

  //Получаем все фильмы с BeatfilmMoviesApi

  const getMoviesFromBeatFilm = () => {
    seIsloading(true);
    movieApi
      .getMoviesFromBeatFilm()
      .then((res) => {
        setBeatfilmMovies(res);
        seIsloading(false);
        console.log(res);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Получаем сохраненные фильмы пользователя

  const getSavedMoviesByUser = () => {
    mainApi
      .getSavedMoviesByUser()
      .then((res) => {
        setSavedMovies(res);
        setSavedFilteredMovies(res);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось получить сохраненные фильмы.');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Получаем сохраненные фильмы пользователя при входе в учетную запись

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesByUser();
    }
  }, [loggedIn]);

  //Добавляем фильм в сохраненные

  const addMovieToSavedMovies = (id) => {
    const movie = findedMovies.find((item) => item.movieId === id);
    mainApi
      .addMovieToSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setSavedFilteredMovies([...savedFilteredMovies, res]);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось сохранить фильм');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  //Удаляем фильм из сохраненных

  const deleteMovieFromSavedMovies = (id) => {
    const movie = savedMovies.find((item) => item.movieId === id);
    const filterMovies = (movies, movieId) =>
      movies.filter((item) => item.movieId !== movieId);
    mainApi
      .deleteMovieFromSavedMovies(movie._id)
      .then((res) => {
        const newSavedMovies = filterMovies(savedMovies, id);
        const newFilteredSavedMovies = filterMovies(savedFilteredMovies, id);
        setSavedMovies([newSavedMovies]);
        setFilteredSavedMovies([newFilteredSavedMovies]);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось удалить сохраненный фильм');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <HamburgerMenu
          loggedIn={loggedIn}
          handleHamburgerMenu={handleHamburgerMenu}
          hamburgerMenu={hamburgerMenu}
        />
        <Header
          loggedIn={loggedIn}
          handleHamburgerMenu={handleHamburgerMenu}
          hamburgerMenu={hamburgerMenu}
        />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            element={
              <ProtectedRoute loggedIn={!loggedIn} navigateTo='/movies' />
            }
          >
            <Route
              path='/signup'
              element={
                <Register handleRegister={handleRegister} message={message} />
              }
            />
            <Route
              path='/signin'
              element={<Login handleLogin={handleLogin} message={message} />}
            />
          </Route>
          <Route
            element={<ProtectedRoute loggedIn={loggedIn} navigateTo='/' />}
          >
            <Route
              path='/movies'
              element={
                <Movies
                  movies={beatfilmMovies}
                  filteredMovies={filteredBeatfilmMovies}
                  setFilteredMovies={setFilteredBeatfilmMovies}
                  getMoviesFromBeatFilm={getMoviesFromBeatFilm}
                  isloading={isloading}
                  addMovieToSavedMovies={addMovieToSavedMovies}
                  deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
                  setFirstSearch={setFirstSearch}
                />
              }
            />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route
              path='/profile'
              element={
                <Profile
                  handleEditProfileInfo={handleEditProfileInfo}
                  handleLogout={handleLogout}
                  message={message}
                />
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
