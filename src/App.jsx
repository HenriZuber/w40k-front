import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import ChoiceDropdown from './ChoiceDropdown';
import ChatApp from './ChatApp';

function App() {

  const [selectedChoice, setSelectedChoice] = useState('');

  useEffect(() => {
    // Check if the choice is already saved in a cookie
    const savedChoice = Cookies.get('choice');
    if (savedChoice) {
      setSelectedChoice(savedChoice);
    }
  }, []);

  return (
    <header className="App-header">
      <div>
        {!selectedChoice && <ChoiceDropdown />}
        {selectedChoice && <ChatApp />}
      </div>
    </header>
  );
}

export default App;
