import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../style/App.css";
import ChoiceDropdown from "./ChoiceDropdown";
import HelpApp from "./HelpApp";
import InfoApp from "./InfoApp";
import ChatApp from "./ChatApp";
import Settings from "./Settings";
import env_data from "../store/env.json";

function App() {
  const [activeComponent, setActiveComponent] = useState("ChatApp");

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    document.body.className = theme ? "dark" : "light";
  }, [theme]);

  const triggerEffect = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    const initChoiceCookie = getCurrActiveChoiceCookie();
    const savedChoice = initChoiceCookie;
    if (savedChoice) {
      setActiveComponent("ChatApp");
    } else {
      setActiveComponent("ChoiceDropdown");
    }
  }, []);

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

  const handleActiveComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <header className="App-header">
        <h3>Imperium Explorer</h3>
      </header>
      <div className="App-body">
        {activeComponent === "ChoiceDropdown" && (
          <ChoiceDropdown onArmySaved={handleActiveComponent} />
        )}
        {activeComponent === "ChatApp" && (
          <ChatApp onNavClicked={handleActiveComponent} />
        )}
        {activeComponent === "Settings" && (
          <Settings
            onSaveClicked={handleActiveComponent}
            triggerEffect={triggerEffect}
          />
        )}
        {activeComponent === "HelpApp" && (
          <HelpApp onBackClicked={handleActiveComponent} />
        )}
        {activeComponent === "InfoApp" && (
          <InfoApp onBackClicked={handleActiveComponent} />
        )}
      </div>
    </>
  );
}

export default App;
