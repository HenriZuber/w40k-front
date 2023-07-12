import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import en_rules_pdfs_Data from '../store/en_rules_pdfs.json';
import fr_rules_pdfs_Data from '../store/fr_rules_pdfs.json';
import env_data from "../store/env.json";
import '../style/ChoiceDropdown.css';

const ChoiceDropdown = ({ onArmySaved }) => {
  const [selectedChoice, setSelectedChoice] = useState('');
  const [curr_rules_pdfs_Data, setCurr_rules_pdfs_Data] = useState([]);

  const handleChoiceSelect = (event) => {
    setSelectedChoice(event.target.value);
  };

  useEffect(() => {
    const savedlang = Cookies.get('lang');
    console.log(savedlang);
    if (savedlang) {
      if (savedlang === 'en') {
        setCurr_rules_pdfs_Data(en_rules_pdfs_Data);
      } else if (savedlang === 'fr') {
        setCurr_rules_pdfs_Data(fr_rules_pdfs_Data);
      }
    } else {
      Cookies.set('lang', 'en', { expires: env_data.cookieDuration });
      setCurr_rules_pdfs_Data(en_rules_pdfs_Data);
    }

  }, []);

  const handleSaveChoice = () => {
    const coreBooksList = curr_rules_pdfs_Data
      .filter((army) => army.category === "key-downloads")
      .map((army) => army.file_name);

    const choiceList = [...coreBooksList, selectedChoice];
    const cookieValue = JSON.stringify(choiceList);
    if (Cookies.get("lang") === "fr") {
      var cookieName = "fr_choice";
      var otherCookieName = "en_choice";
      var otherCookieValue = en_rules_pdfs_Data.filter((army) => army.category === "key-downloads").map((army) => army.file_name);
    } else {
      var cookieName = "en_choice";
      var otherCookieName = "fr_choice";
      var otherCookieValue = fr_rules_pdfs_Data.filter((army) => army.category === "key-downloads").map((army) => army.file_name);
    }
    Cookies.set(cookieName, cookieValue, { expires: env_data.cookieDuration });
    Cookies.set(otherCookieName, JSON.stringify(otherCookieValue), { expires: env_data.cookieDuration });
    onArmySaved("ChatApp");
  };

  const filteredOptions = curr_rules_pdfs_Data.filter((army) => army.category === "indexes-faqs-and-errata");

  return (
    <div className="choice-dropdown-main">
      <h1>Choose your army</h1>
      <div>
        <select className="select-dropdown" value={selectedChoice} onChange={handleChoiceSelect}>
          <option value="">None</option>
          {filteredOptions.map((army, index) => (
            <option key={index} value={army.file_name}>
              {army.name}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleSaveChoice}>Save</button>
      </div>
      <p style={{ textAlign: "center" }}>You'll be able to change later in the <b>settings</b>.<br></br>Don't forget to check the <b>help</b> and <b>information</b> too !</p>
    </div >
  );
};

export default ChoiceDropdown;