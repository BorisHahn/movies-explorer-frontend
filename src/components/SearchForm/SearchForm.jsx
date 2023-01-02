import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
const SearchForm = ({
  searchText,
  setSearchText,
  shortFilmFlag,
  setShortFilmFlag,
  onSubmit,
  message,
  setMessage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText === '') {
      setMessage('Введите запрос в поисковую строку');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    onSubmit();
  };

  //Переключаем состояние чекбокса короткометражек
  const handleToggleCheckBox = (e) => {
    setShortFilmFlag(e.target.checked);
  };

  //Изменяем стейт значения инпута при вводе запроса
  const onChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <form className='search-form'>
      <div className='search-form__wrapper'>
        <input
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          onChange={onChangeInput}
          value={searchText}
          required
        ></input>
        <button
          type='submit'
          onClick={handleSubmit}
          className='search-form__button'
        >
          Найти
        </button>
      </div>
      <span className='search-form__error '>{message}</span>
      <div className='search-form__toggle'>
        <FilterCheckbox
          handleToggleCheckBox={handleToggleCheckBox}
          shortFilmFlag={shortFilmFlag}
        />
        <p className='search-form__toggle-text'>Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
