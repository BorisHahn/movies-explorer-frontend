import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
const SearchForm = () => {
  return (
    <section className='search-form'>
      <div className='search-form__wrapper'>
        <input className='search-form__input' placeholder='Фильм'></input>
        <button className='search-form__button'>Найти</button>
      </div>
      <div className='search-form__toggle'>
        <FilterCheckbox />
        <p className='search-form__toggle-text'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
