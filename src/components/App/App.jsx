import React from 'react';
import { useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [message, setMessage] = useState('');
  const handleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  const handleRegister = (data) => {
    mainApi
      .signUp(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({ name, email });
          navigate('/movies');
          setMessage('Вы успешно зарегестрировались!');
          handleInfoTooltipClick();
          history.push('/sign-in');
          setTimeout(() => setMessage(''), 5000);
        }
      })
      .catch((e) => {
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
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
              element={<Register handleRegister={handleRegister} message={message}/>}
            />
            <Route path='/signin' element={<Login />} />
          </Route>
          <Route
            element={<ProtectedRoute loggedIn={loggedIn} navigateTo='/' />}
          >
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
