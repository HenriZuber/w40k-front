import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './style/App.css';
import ChoiceDropdown from './ChoiceDropdown';
import ChatApp from './ChatApp';
import Settings from './Settings'

function App() {

  const [activeComponent, setActiveComponent] = useState("ChoiceDropdown");

  useEffect(() => {
    // Check if the choice is already saved in a cookie
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      console.log(choiceArray);
      setActiveComponent("Settings");
    }
  }, []);

  const handleActiveComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <header className="App-header">
        <h3>Wahabot</h3>
      </header>
      <body className='App-body'>
        {activeComponent === "ChoiceDropdown" && <ChoiceDropdown onArmySaved={handleActiveComponent} />}
        {activeComponent === "ChatApp" && <ChatApp onSettingsClicked={handleActiveComponent} />}
        {activeComponent === "Settings" && <Settings onSaveClicked={handleActiveComponent} />}
      </body>
    </>
  );
}

export default App;
