import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
const SearchForm = ({
  onSubmit,
  onChangeInput,
  checkBoxValue,
  handleToggleCheckBox,
  value,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className='search-form' >
      <div className='search-form__wrapper'>
        <input
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          onChange={onChangeInput}
          value={value}
          // required
        ></input>
        <button type='submit' onClick={handleSubmit} className='search-form__button'>Найти</button>
      </div>
      <div className='search-form__toggle'>
        <FilterCheckbox
          handleToggleCheckBox={handleToggleCheckBox}
          checkBoxValue={checkBoxValue}
        />
        <p className='search-form__toggle-text'>Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
