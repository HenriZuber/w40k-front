import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import en_rules_pdfs_Data from "../store/en_rules_pdfs.json";
import fr_rules_pdfs_Data from "../store/fr_rules_pdfs.json";
import env_data from "../store/env.json";
import "../style/Settings.css";
import "../style/LangChangeSwitch.css";

function Settings(props) {
  const [pdfsChecked, setPdfsChecked] = useState([]);
  const [curr_rules_pdfs_Data, setCurr_rules_pdfs_Data] = useState([]);
  const [language, setLanguage] = useState(Cookies.get("lang") || "en");

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "fr" : "en";
    setLanguage(newLanguage);
    Cookies.set("lang", newLanguage);
  };

  useEffect(() => {
    const initChoiceCookie = getCurrActiveChoiceCookie();
    if (initChoiceCookie) {
      const choiceArray = JSON.parse(initChoiceCookie);
      setPdfsChecked(choiceArray);
    }
    const savedlang = Cookies.get("lang");
    console.log(savedlang);
    if (savedlang) {
      if (savedlang === "en") {
        setCurr_rules_pdfs_Data(en_rules_pdfs_Data);
      } else if (savedlang === "fr") {
        setCurr_rules_pdfs_Data(fr_rules_pdfs_Data);
      }
    } else {
      Cookies.set("lang", "en", { expires: env_data.cookieDuration });
      setCurr_rules_pdfs_Data(en_rules_pdfs_Data);
    }
  }, [language]);

  const getCurrActiveChoiceCookie = () => {
    const savedlang = Cookies.get("lang");
    if (savedlang) {
      if (savedlang === "en") {
        const currActiveChoiceCookie = Cookies.get("en_choice");
        return currActiveChoiceCookie;
      } else if (savedlang === "fr") {
        const currActiveChoiceCookie = Cookies.get("fr_choice");
        return currActiveChoiceCookie;
      }
    } else {
      Cookies.set("lang", "en", { expires: env_data.cookieDuration });
      const currActiveChoiceCookie = Cookies.get("en_choice");
      return currActiveChoiceCookie;
    }
  };

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
    props.onSaveClicked("ChatApp");
  };

  const handleSaveChoice = () => {
    const cookieValue = JSON.stringify(pdfsChecked);
    var cookieName = "en_choice";
    if (Cookies.get("lang") === "fr") {
      cookieName = "fr_choice";
    }
    Cookies.set(cookieName, cookieValue, { expires: env_data.cookieDuration });
    props.onSaveClicked("ChatApp");
  };

  useEffect(() => {
    console.log(pdfsChecked);
  }, [pdfsChecked]);

  const toggleTheme = () => {
    props.triggerEffect();
  };

  return (
    <div className="settings-main">
      <button id="close-button" type="submit" onClick={handleCancelChoice}>
        <IoCloseSharp />
      </button>

      <h2 className="category-name">Language</h2>
      <div className="toggle-switch">
        <input
          type="checkbox"
          id="language-toggle"
          className="toggle-switch-checkbox"
          checked={language === "fr"}
          onChange={handleLanguageChange}
        />
        <label className="toggle-switch-label" htmlFor="language-toggle">
          <span className="toggle-switch-inner"></span>
          <span className="toggle-switch-switch"></span>
        </label>
      </div>

      <h2 className="category-name">Codex</h2>
      <div className="column-parent">
        {curr_rules_pdfs_Data
          .filter((item) => !(item.category === "key-downloads"))
          .map((item) => (
            <div
              key={item.file_name}
              className={`pdf-name-wrapper ${
                pdfsChecked.includes(item.file_name) ? "active" : ""
              }`}
              onClick={() =>
                item.file_name !== "Hello_Kitty"
                  ? handleOptionToggle(item.file_name)
                  : toggleTheme()
              }
            >
              <p className="pdf-name">{item.name}</p>
            </div>
          ))}
      </div>

      <h2 className="category-name">Main Rules</h2>
      <div className="column-parent">
        {curr_rules_pdfs_Data
          .filter((item) => item.category === "key-downloads")
          .map((item) => (
            <div
              className={`pdf-name-wrapper ${
                pdfsChecked.includes(item.file_name) ? "active" : ""
              }`}
              onClick={() => handleOptionToggle(item.file_name)}
              key={item.file_name}
            >
              <p className="pdf-name">{item.name}</p>
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
}

export default Settings;
