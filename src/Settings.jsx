import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import rules_pdfs_Data from './store/rules_pdfs.json';
import "./style/Settings.css"

const Settings = ({ onSaveClicked }) => {

  const [pdfsChecked, setPdfsChecked] = useState([]);

  useEffect(() => {
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      console.log(choiceArray);
      setPdfsChecked(choiceArray);
    }
  }, []);

  const handleOptionToggle = (toggled_pdf_name) => {
    if (pdfsChecked.includes(toggled_pdf_name)) {
      const newPdfsChecked = pdfsChecked.filter((pdf_name) => pdf_name !== toggled_pdf_name);
      setPdfsChecked(newPdfsChecked);
    } else {
      const newPdfsChecked = [...pdfsChecked, toggled_pdf_name];
      setPdfsChecked(newPdfsChecked);
    }
  }

  const handleSaveChoice = () => {
    const cookieValue = JSON.stringify(pdfsChecked);
    Cookies.set('choice', cookieValue);
    onSaveClicked("ChatApp");
  }

  useEffect(() => {
    console.log(pdfsChecked);
  }, [pdfsChecked]);


  return (
    <div className='settings-main'>
      <h2 className='category-name'>Codex</h2>
      <div className='column-parent'>
        {rules_pdfs_Data.filter((item) => !item.is_core).map((item) => (
          <div className="column-child" key={item.pdf_name}>
            <input
              type="checkbox"
              checked={pdfsChecked.includes(item.pdf_name)}
              onChange={() => handleOptionToggle(item.pdf_name)}
            />
            <label>{item.label}</label>
          </div>
        ))}
      </div>

      <h2 className='category-name'>Main Rules</h2>
      <div className='column-parent'>
        {rules_pdfs_Data.filter((item) => item.is_core).map((item) => (
          <div className="column-child" key={item.pdf_name}>
            <input
              type="checkbox"
              checked={pdfsChecked.includes(item.pdf_name)}
              onChange={() => handleOptionToggle(item.pdf_name)}
            />
            <label>{item.label}</label>
          </div>
        ))}
      </div>
      <button className="settings-button" onClick={handleSaveChoice}>Save</button>
    </div>
  );
};

export default Settings;