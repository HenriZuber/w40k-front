import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import {
  IoSend,
  IoSettingsSharp,
  IoHelpCircleSharp,
  IoInformationCircleSharp,
  IoCafeSharp,
} from "react-icons/io5";
import "../style/ChatApp.css";
import env_data from "../store/env.json";
import chat_app_text_data from "../store/texts_files/chat_app_texts.json"

const ChatApp = ({ onNavClicked }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatWindowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      id: Date.now(), // Unique identifier for each message
      text,
      isUser,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    sessionStorage.setItem('conversation', JSON.stringify([newMessage, ...messages]));
  };

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

  useEffect(() => {
    const storedConv = sessionStorage.getItem('conversation');
    console.log(JSON.parse(storedConv))
    if (storedConv) {
      setMessages(JSON.parse(storedConv));
      //  
    } else {
      const delay = 200; // Delay in milliseconds
      const timeoutId = setTimeout(() => {
        addMessage(chat_app_text_data["greeting-message"][Cookies.get("lang")]);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, []);

  const handleSettingsClicked = () => {
    onNavClicked("Settings");
  };

  const handleHelpClicked = () => {
    onNavClicked("HelpApp");
  };

  const handleInfoClicked = () => {
    onNavClicked("InfoApp");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    addMessage(inputValue, true);
    setInputValue("");

    try {
      setIsLoading(true);
      const savedLang = Cookies.get("lang");
      const choiceArray = JSON.parse(getCurrActiveChoiceCookie());
      const response = await fetch(env_data.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          sources_input: choiceArray,
          country_code: savedLang,
        }),
      });

      if (!response.ok) {
        throw new Error("Chatbot API request failed.");
      }

      const data = await response.json();
      const parsed_body = JSON.parse(data.body);
      const botResponse = parsed_body.message; // JSON key
      setIsLoading(false);
      addMessage(botResponse);
    } catch (error) {
      setIsLoading(false);
      addMessage(chat_app_text_data["error-message"][Cookies.get("lang")] + error.message);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window when a new message is added
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-app">
      <button
        id="settings-button"
        type="submit"
        onClick={handleSettingsClicked}
      >
        <IoSettingsSharp />
      </button>

      <button id="help-button" type="submit" onClick={handleHelpClicked}>
        <IoHelpCircleSharp />
      </button>

      <button id="info-button" type="submit" onClick={handleInfoClicked}>
        <IoInformationCircleSharp />
      </button>

      <a href={env_data.coffeeLink} target="_blank" rel="noopener noreferrer">
        <button id="cafe-button">
          <IoCafeSharp />
        </button>
      </a>

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
            className={`message ${message.isUser ? "user-message" : "bot-message"
              }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-wrapper">
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={chat_app_text_data["placeholder-typing-message"][Cookies.get("lang")]}
          />
          <button type="submit">
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
