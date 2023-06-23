import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './style/App.css';
import ChoiceDropdown from './ChoiceDropdown';
import ChatApp from './ChatApp';

function App() {

  const [activeComponent, setActiveComponent] = useState("ChoiceDropdown");

  useEffect(() => {
    // Check if the choice is already saved in a cookie
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      console.log(choiceArray);
      setActiveComponent("ChatApp");
    }
  }, []);

  const handleActiveComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <header className="App-header">
      <div>
        {activeComponent === "ChoiceDropdown" && <ChoiceDropdown onArmySaved={handleActiveComponent} />}
        {activeComponent === "ChatApp" && <ChatApp onSettingsClicked={handleActiveComponent} />}
      </div>
    </header>
  );
}

export default App;
