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
  //Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  //Отфильтрованные сохраненные фильмы
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([]);
  //Состояние загрузки
  const [isloading, setIsloading] = useState(false);
  //Значение поисковой строки
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  //Значение поисковой строки на странице Сохраненные фильмы
  const [searchTextSaved, setSearchTextSaved] = useState('');
  //Значение чекбокса 'короткометражки'
  const [shortFilmFlag, setShortFilmFlag] = useState(
    localStorage.getItem('shortFilmFlag') === 'true'
  );
  //Значение чекбокса 'короткометражки' на странице Сохраненные фильмы
  const [shortFilmFlagSaved, setShortFilmFlagSaved] = useState(false);
  //Видимость кнопки 'еще'
  const [isLoadButtonVisible, setIsLoadButtonVisible] = useState(
    movies.length > 0
  );
  const [emptyBannerVisible, setEmptyBannerVisible] = useState(
    localStorage.getItem('allMovies') != null
  );
  const [emptyBannerVisibleSaved, setEmptyBannerVisibleSaved] = useState(
    savedMovies.length > 0
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
        setTimeout(() => setMessage(''), 3000);
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
        setTimeout(() => setMessage(''), 3000);
      });
  };

  //Выход из учетной записи

  const handleLogout = () => {
    mainApi
      .signOut()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser(null);
        setMovies([]);
        setSavedMovies([]);
        setFiltredSavedMovies([]);
        setSearchText('');
        setSearchTextSaved('');
        setShortFilmFlag(false);
        setShortFilmFlagSaved(false);
        setEmptyBannerVisible(false);
        setEmptyBannerVisibleSaved(false);
        setMessage('');
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  //Редактирование данных пользователя

  const handleEditProfileInfo = ({ name, email }) => {
    mainApi
      .editProfileInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setMessage('Данные успешно обновлены!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTimeout(() => setMessage(''), 3000);
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
        setTimeout(() => setMessage(''), 3000);
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
    setMessage('');
    getMovies().then((res) =>
      setMovies(
        sliceMoviesArray(
          filterMovies(res, searchText, shortFilmFlag, shortFilmDuration)
        )
      )
    );
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('shortFilmFlag', shortFilmFlag);
  };

  // Отправка поискового запроса на странице Сохраненные фильмы

  const onSubmitSaved = () => {
    setMessage('');
    setEmptyBannerVisibleSaved(true);
    setFiltredSavedMovies(
      filterMovies(
        savedMovies,
        searchTextSaved,
        shortFilmFlagSaved,
        shortFilmDuration
      )
    );
  };

  const applyFilter = () => {
    setMovies(
      sliceMoviesArray(
        filterMovies(
          gelLocalMovies(),
          searchText,
          shortFilmFlag,
          shortFilmDuration
        )
      )
    );
  };

  const applyFilterSaved = () => {
    setFiltredSavedMovies(
      filterMovies(
        savedMovies,
        searchTextSaved,
        shortFilmFlagSaved,
        shortFilmDuration
      )
    );
  };

  //При монтировании приложения получаем значения фильтра и фильмы

  useEffect(applyFilter, []);
  useEffect(applyFilterSaved, [savedMovies]);

  useEffect(applyFilter, [shortFilmFlag]);
  useEffect(applyFilterSaved, [shortFilmFlagSaved]);

  //Получаем сохраненные фильмы пользователя

  const getSavedMoviesByUser = () => {
    setIsloading(true);
    return mainApi
      .getSavedMoviesByUser()
      .then((res) => {
        setSavedMovies([...res]);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось получить сохраненные фильмы.');
        setTimeout(() => setMessage(''), 3000);
      })
      .finally(setIsloading(false));
  };

  //Получаем сохраненные фильмы пользователя при входе в учетную запись

  useEffect(() => {
    if (loggedIn) {
      getSavedMoviesByUser();
    }
  }, [loggedIn]);

  //Добавляем фильм в сохраненные

  const addMovieToSavedMovies = (id) => {
    const movie = movies.find((item) => item.movieId === id);
    mainApi
      .addMovieToSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось сохранить фильм');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  //Удаляем фильм из сохраненных

  const deleteMovieFromSavedMovies = (id) => {
    const movie = savedMovies.find((item) => item.movieId === id);
    const filterMovies = (movies, movie) => {
      const filterSavedMovies = movies.filter(
        (item) => item.movieId !== movie.movieId
      );
      return filterSavedMovies;
    };
    setIsloading(true);
    mainApi
      .deleteMovieFromSavedMovies(movie._id)
      .then(() => {
        setSavedMovies(filterMovies(savedMovies, movie));
      })
      .catch((e) => {
        checkAuthError(e);
        setMessage('Не удалось удалить сохраненный фильм');
        setTimeout(() => setMessage(''), 3000);
      })
      .finally(setIsloading(false));
  };

  //Отрисвока карточек с лайками в главном массиве фильмов

  const calcLikeCards = (array) => {
    return array.map((item) => {
      return {
        ...item,
        isLiked: savedMovies.some((m) => m.movieId === item.movieId),
      };
    });
  };

  //Устанавливаю количество отображаемых карточек и добавляемых в зависимости от разрешения

  const setCardQty = () => {
    if (window.innerWidth >= 1280) {
      return { initial: 12, addCard: 3 };
    } else if (window.innerWidth >= 768) {
      return { initial: 8, addCard: 2 };
    } else {
      return { initial: 5, addCard: 2 };
    }
  };

  //Обрезаю массив с карточками

  const sliceMoviesArray = (movies) => {
    const quantity = setCardQty();
    if (movies.length > quantity.initial) {
      const slicedMoviesArray = movies.slice(0, quantity.initial);
      return slicedMoviesArray;
    }
    return movies;
  };

  //Обновление количество отрисованных карточек

  let updateMoviesTimeout = null;
  const updateMoviesList = () => {
    clearTimeout(updateMoviesTimeout);
    updateMoviesTimeout = setTimeout(() => {
      setMovies(
        sliceMoviesArray(
          filterMovies(
            gelLocalMovies(),
            searchText,
            shortFilmFlag,
            shortFilmDuration
          )
        )
      );
    }, 500);
  };

  useEffect(() => {
    if (!['/movies', '/saved-movies'].includes(location.pathname)) {
      return;
    }
    window.addEventListener('resize', updateMoviesList);
    return () => window.removeEventListener('resize', updateMoviesList);
  });

  // дозагрузка фильмов по кнопке еще

  const loadMore = () => {
    const originMovies = filterMovies(
      gelLocalMovies(),
      searchText,
      shortFilmFlag,
      shortFilmDuration
    );
    const quantity = setCardQty();
    const initial = movies.length;
    const add = quantity.addCard;
    const end = initial + add;
    const addedCards = originMovies.slice(initial, end);
    setMovies([...movies, ...addedCards]);
  };

  useEffect(() => {
    const array = filterMovies(
      gelLocalMovies(),
      searchText,
      shortFilmFlag,
      shortFilmDuration
    );
    setIsLoadButtonVisible(array.length !== movies.length);
    setEmptyBannerVisible(localStorage.getItem('allMovies') != null);
  }, [movies]);

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
                  movies={calcLikeCards(movies)}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  shortFilmFlag={shortFilmFlag}
                  setShortFilmFlag={setShortFilmFlag}
                  onSubmit={onSubmit}
                  isloading={isloading}
                  addMovieToSavedMovies={addMovieToSavedMovies}
                  deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
                  message={message}
                  setMessage={setMessage}
                  loadMore={loadMore}
                  isLoadButtonVisible={isLoadButtonVisible}
                  emptyBannerVisible={emptyBannerVisible}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  movies={sliceMoviesArray(filtredSavedMovies)}
                  addMovieToSavedMovies={addMovieToSavedMovies}
                  deleteMovieFromSavedMovies={deleteMovieFromSavedMovies}
                  isloading={isloading}
                  message={message}
                  setMessage={setMessage}
                  searchText={searchTextSaved}
                  setSearchText={setSearchTextSaved}
                  shortFilmFlag={shortFilmFlagSaved}
                  setShortFilmFlag={setShortFilmFlagSaved}
                  onSubmit={onSubmitSaved}
                  emptyBannerVisible={emptyBannerVisibleSaved}
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
