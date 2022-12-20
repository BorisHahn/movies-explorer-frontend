import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMore from '../LoadMore/LoadMore';
import './Movies.css';

const Movies = ({
  movies,
  filteredMovies,
  setFilteredMovies,
  getMoviesFromBeatFilm,
  isloading,
  addMovieToSavedMovies,
  deleteMovieFromSavedMovies,
  setFirstSearch,
}) => {
  const [value, setValue] = useState(localStorage.getItem('inputValue') || '');
  const [checkBoxValue, setCheckBoxValue] = useState(
    localStorage.getItem('checkBoxValue') || ''
  );
  const [validationMessage, setvalidationMessage] = useState('');

  //Переключаем состояние чекбокса короткометражек
  const handleToggleCheckBox = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  //Изменяем стейт значения инпута при вводе запроса
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    // if (!value) {
    //   setvalidationMessage('Нужно ввести ключевое слово');
    // } else {
    getMoviesFromBeatFilm();
  };

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={onSubmit}
        onChangeInput={onChangeInput}
        checkBoxValue={checkBoxValue}
        handleToggleCheckBox={handleToggleCheckBox}
        value={value}
      />
      <MoviesCardList
        addMovie={addMovieToSavedMovies}
        deleteMovie={deleteMovieFromSavedMovies}
        movies={movies}
      />
      <LoadMore />
    </main>
  );
};

export default Movies;
