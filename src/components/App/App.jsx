import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
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
  const [message, setMessage] = useState('');
  const handleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

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

  const checkAuthError = (error) => {
    if (error.status === 401) {
      setIsLogin(false);
      setCurrentUser(null);
      navigate('/');
    }
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
            <Route path='/movies' element={<Movies />} />
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
