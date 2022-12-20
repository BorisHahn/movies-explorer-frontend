import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { shortFilmDuration } from '../../utils/constants';
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
  //Фильмы
  const [movies, setMovies] = useState([]);
  //Состояние загрузки
  const [isloading, setIsloading] = useState(false);
  //Значение поисковой строки
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  //Значение чекбокса 'короткометражки'
  const [shortFilmFlag, setShortFilmFlag] = useState(
    localStorage.getItem('shortFilmFlag') === 'true'
  );

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

  const gelLocalMovies = () => {
    return JSON.parse(localStorage.getItem('allMovies')) || [];
  };

  //Получаем все фильмы с BeatfilmMoviesApi

  const getMovies = () => {
    let movies = gelLocalMovies();
    if (Array.isArray(movies) && movies.length > 0) {
      return Promise.resolve(movies);
    }
    setIsloading(true);
    return movieApi
      .getMoviesFromBeatFilm()
      .then((res) => {
        localStorage.setItem('allMovies', JSON.stringify(res));
        return res;
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        setTimeout(() => setMessage(''), 5000);
      })
      .then((value = []) => {
        setIsloading(false);
        return value;
      });
  };
  // Фильтрация списка фильмов

  const filterMovies = (
    movies,
    searchText,
    shortFilmFlag,
    shortFilmDuration
  ) => {
    const lowerText = searchText.toLowerCase();
    return movies.filter((movie) => {
      return (
        (movie.nameRU.toLowerCase().includes(lowerText) ||
          movie.nameEN.toLowerCase().includes(lowerText)) &&
        (!shortFilmFlag || movie.duration <= shortFilmDuration)
      );
    });
  };
  // Отправка поискового запроса

  const onSubmit = () => {
    getMovies().then((res) =>
      setMovies(filterMovies(res, searchText, shortFilmFlag, shortFilmDuration))
    );
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('shortFilmFlag', shortFilmFlag);
  };

  const applyFilter = () => {
    setMovies(
      filterMovies(
        gelLocalMovies(),
        searchText,
        shortFilmFlag,
        shortFilmDuration
      )
    );
  };

  //При монтировании приложения получаем значения фильтра и фильмы

  useEffect(applyFilter, []);
  useEffect(applyFilter, [shortFilmFlag]);

  //Получаем сохраненные фильмы пользователя

  const getSavedMoviesByUser = () => {
    return mainApi
      .getSavedMoviesByUser()
      .then((res) => {
        return res;
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
        // setSavedMovies([...savedMovies, res]);
        // setSavedFilteredMovies([...savedFilteredMovies, res]);
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
        // const newSavedMovies = filterMovies(savedMovies, id);
        // const newFilteredSavedMovies = filterMovies(savedFilteredMovies, id);
        // setSavedMovies([newSavedMovies]);
        // setFilteredSavedMovies([newFilteredSavedMovies]);
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
                  movies={movies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  shortFilmFlag={shortFilmFlag}
                  setShortFilmFlag={setShortFilmFlag}
                  onSubmit={onSubmit}
                  isloading={isloading}
                  addMovieToSavedMovies={addMovieToSavedMovies}
                  deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setShortFilmFlag={setShortFilmFlag}
                />
              }
            />
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
