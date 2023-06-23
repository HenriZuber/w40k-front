import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import './style/ChatApp.css';

const ChatApp = ({ onSettingsClicked }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatWindowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      id: Date.now(), // Unique identifier for each message
      text,
      isUser,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  useEffect(() => {
    const delay = 200; // Delay in milliseconds
    const timeoutId = setTimeout(() => {
      addMessage('Hello ! How can I assist you ?')
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') return;

    addMessage(inputValue, true);
    setInputValue('');

    try {
      setIsLoading(true);
      const response = await fetch('https://1xwd1tvxjg.execute-api.eu-west-3.amazonaws.com/default/w40k-back-func', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Chatbot API request failed.');
      }

      const data = await response.json();
      const parsed_body = JSON.parse(data.body)
      const botResponse = parsed_body.message // JSON key
      setIsLoading(false);
      addMessage(botResponse);
    } catch (error) {
      setIsLoading(false);
      addMessage('Oops! Something went wrong.');
      addMessage(error.message);
    }
  };


  useEffect(() => {
    // Scroll to the bottom of the chat window when a new message is added
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-window" ref={chatWindowRef}>
        {/* Render loading indicator while waiting for API response */}
        {isLoading && (
          <div className="message bot-message">
            <div className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}

      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default ChatApp;