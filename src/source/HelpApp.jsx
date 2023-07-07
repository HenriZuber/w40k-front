import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../style/HelpApp.css";

const HelpApp = ({ onBackClicked }) => {


  const handleCancelChoice = () => {
    onBackClicked("ChatApp");
  };


  return (
    <div className="help-main">
      <button id="close-button" type="submit" onClick={handleCancelChoice}>
        <IoCloseSharp />
      </button>
      <h2>Help</h2>
      <p>To have better results, try to be direct and more precise in your request.</p>
      <p>For example:</p>
      <blockquote>
        <p><em>"Define the overwatch stratagem"</em> will give much better results than <em>"What is overwatch?"</em></p>
      </blockquote>
      <p>Also, if the results are too vague or don't answer your question, try to select more specific sources.</p>
      <p>You can change which sources are taken into account on the settings page.</p>
    </div>
  );
};

export default HelpApp;