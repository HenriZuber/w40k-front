import React, { useState } from 'react';
import Cookies from 'js-cookie';
import armiesData from './store/armies.json';

const ChoiceDropdown = () => {
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoiceSelect = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleSaveChoice = () => {
    Cookies.set('choice', selectedChoice);
  };

  const filteredOptions = armiesData.filter((army) => army.is_core === false);

  return (
    <div>
      <h2>Choose an option:</h2>
      <select value={selectedChoice} onChange={handleChoiceSelect}>
        <option value="">Select an option</option>
        {filteredOptions.map((army, index) => (
          <option key={index} value={army.pdf_name}>
            {army.label}
          </option>
        ))}
      </select>
      <button onClick={handleSaveChoice}>Save</button>
    </div>
  );
};

export default ChoiceDropdown;