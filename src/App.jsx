import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './style/App.css';
import ChoiceDropdown from './ChoiceDropdown';
import ChatApp from './ChatApp';

function App() {

  const [selectedChoice, setSelectedChoice] = useState("");

  useEffect(() => {
    // Check if the choice is already saved in a cookie
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      setSelectedChoice(choiceArray);
    }
  }, []);

  const handleArmySelected = () => {
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      const choiceArray = JSON.parse(savedChoice);
      setSelectedChoice(choiceArray);
    }
  };

  return (
    <header className="App-header">
      <div>
        {!selectedChoice && <ChoiceDropdown onArmySelect={handleArmySelected} />}
        {selectedChoice && <ChatApp />}
      </div>
    </header>
  );
}

export default App;
