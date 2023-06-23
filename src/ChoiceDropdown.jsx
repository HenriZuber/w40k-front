import React, { useState } from 'react';
import Cookies from 'js-cookie';
import armiesData from './store/armies.json';
import './style/ChoiceDropdown.css';

const ChoiceDropdown = ({ onArmySelect }) => {
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoiceSelect = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleSaveChoice = () => {
    const coreBooksList = armiesData
      .filter((army) => army.is_core)
      .map((army) => army.pdf_name);

    const choiceList = [...coreBooksList, selectedChoice]
    const cookieValue = JSON.stringify(choiceList);
    Cookies.set('choice', cookieValue);
    onArmySelect();
  };

  const filteredOptions = armiesData.filter((army) => army.is_core === false);

  return (
    <div className="choice-dropdown-main">
      <h1>Choose your army</h1>
      <div>
        <select className="select-dropdown" value={selectedChoice} onChange={handleChoiceSelect}>
          <option value="">None</option>
          {filteredOptions.map((army, index) => (
            <option key={index} value={army.pdf_name}>
              {army.label}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleSaveChoice}>Save</button>
      </div>
      <p>You'll be able to change later</p>
    </div >
  );
};

export default ChoiceDropdown;