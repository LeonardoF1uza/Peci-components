import React, { useState } from 'react';
import cn from 'classnames';
import { smalComponentCss } from '../styling/index.js';

const Dropdown = ({ label_text, description }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = Array.from({ length: 10 }, (_, index) => `Opção ${index + 1}`);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };

  return (
    <div className={cn(smalComponentCss.dropsOptions)}>
      <label htmlFor="dropdown">{label_text}</label>
      <select
        className={cn(smalComponentCss.drops)}
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">{description}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* <div className={cn(mainCss.dropsOptions)}>
        {selectedOption && <p>selecionado: {selectedOption}</p>} 
      </div>*/}
    </div>
  );  
};


export default Dropdown;