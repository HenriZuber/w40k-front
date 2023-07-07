import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import rules_pdfs_Data from "../store/rules_pdfs.json";
import env_data from "../store/env.json";
import "../style/Settings.css";


const Settings = ({ onSaveClicked }) => {
  const [pdfsChecked, setPdfsChecked] = useState([]);
  const cookieDuration = env_data.cookieDuration;

  useEffect(() => {
    const savedChoice = Cookies.get("choice");
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      setPdfsChecked(choiceArray);
    }
  }, []);

  const handleOptionToggle = (toggled_pdf_name) => {
    if (pdfsChecked.includes(toggled_pdf_name)) {
      const newPdfsChecked = pdfsChecked.filter(
        (pdf_name) => pdf_name !== toggled_pdf_name
      );
      setPdfsChecked(newPdfsChecked);
    } else {
      const newPdfsChecked = [...pdfsChecked, toggled_pdf_name];
      setPdfsChecked(newPdfsChecked);
    }
  };

  const handleCancelChoice = () => {
    onSaveClicked("ChatApp");
  };

  const handleSaveChoice = () => {
    const cookieValue = JSON.stringify(pdfsChecked);
    Cookies.set("choice", cookieValue, { expires: cookieDuration });
    onSaveClicked("ChatApp");
  };

  useEffect(() => {
    console.log(pdfsChecked);
  }, [pdfsChecked]);

  return (
    <div className="settings-main">
      <button id="close-button" type="submit" onClick={handleCancelChoice}>
        <IoCloseSharp />
      </button>
      <h2 className="category-name">Codex</h2>
      <div className="column-parent">
        {rules_pdfs_Data
          .filter((item) => !item.is_core)
          .map((item) => (
            <div
              key={item.pdf_name}
              className={`pdf-name-wrapper ${pdfsChecked.includes(item.pdf_name) ? "active" : ""
                }`}
              onClick={() => handleOptionToggle(item.pdf_name)}
            >
              <p className="pdf-name">{item.label}</p>
            </div>
          ))}
      </div>

      <h2 className="category-name">Main Rules</h2>
      <div className="column-parent">
        {rules_pdfs_Data
          .filter((item) => item.is_core)
          .map((item) => (
            <div
              className={`pdf-name-wrapper ${pdfsChecked.includes(item.pdf_name) ? "active" : ""
                }`}
              onClick={() => handleOptionToggle(item.pdf_name)}
              key={item.pdf_name}
            >
              <p className="pdf-name">{item.label}</p>
            </div>
          ))}
      </div>
      <div className="save-button-wrapper">
        <button className="save-button" onClick={handleSaveChoice}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
