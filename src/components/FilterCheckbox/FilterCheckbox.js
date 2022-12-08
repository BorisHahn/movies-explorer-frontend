import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label class='filter-checkbox'>
      <input type='checkbox' class='filter-checkbox__checkbox'></input>
      <div class='filter-checkbox__toggler-slider'>
        <div class='filter-checkbox__toggler-knob'></div>
      </div>
    </label>
  );
};

export default FilterCheckbox;
