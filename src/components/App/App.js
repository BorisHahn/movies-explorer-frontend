import React from 'react';
import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          {loggedIn ? <SavedMovies /> : <Redirect to="/signin" />}
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
