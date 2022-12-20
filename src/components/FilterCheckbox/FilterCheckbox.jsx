import './FilterCheckbox.css';

const FilterCheckbox = ({ handleToggleCheckBox, shortFilmFlag }) => {
  return (
    <label className='filter-checkbox'>
      <input
        type='checkbox'
        className='filter-checkbox__checkbox'
        checked={shortFilmFlag}
        onChange={handleToggleCheckBox}
      ></input>
      <div className='filter-checkbox__toggler-slider'>
        <div className='filter-checkbox__toggler-knob'></div>
      </div>
    </label>
  );
};

export default FilterCheckbox;
