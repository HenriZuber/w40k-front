import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../style/App.css";
import ChoiceDropdown from "./ChoiceDropdown";
import HelpApp from "./HelpApp";
import InfoApp from "./InfoApp";
import ChatApp from "./ChatApp";
import Settings from "./Settings";

function App() {
  const [activeComponent, setActiveComponent] = useState("ChatApp");

  useEffect(() => {
    // Check if the choice is already saved in a cookie
    const savedChoice = Cookies.get("choice");
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      console.log(choiceArray);
      setActiveComponent("ChatApp");
    } else {
      setActiveComponent("ChoiceDropdown");
    }
  }, []);

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
          <Settings onSaveClicked={handleActiveComponent} />
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
