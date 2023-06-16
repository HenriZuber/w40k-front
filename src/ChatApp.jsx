import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatWindowRef = useRef(null);

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
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputValue,
          userId: 5,
        }),
      });

      if (!response.ok) {
        throw new Error('Chatbot API request failed.');
      }

      const data = await response.json();
      const botResponse = "I got " + data.title // JSON key
      addMessage(botResponse);
    } catch (error) {
      addMessage('Oops! Something went wrong.');
      addMessage(error.message);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window when a new message is added
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    messages.map((message) => (console.log(message.text + message.id)))
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-window" ref={chatWindowRef}>
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