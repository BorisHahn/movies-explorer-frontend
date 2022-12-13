import React from 'react';
import { useState } from 'react';
import { Route, Routes, Navigate, useHistory } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(true);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const handleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };
  return (
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
        <Route path='/movies' element={<Movies />} />
        <Route
          path='/saved-movies'
          element={
            loggedIn ? <SavedMovies /> : <Navigate replace to='/signin' />
          }
        />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
