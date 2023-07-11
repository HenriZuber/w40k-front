import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../style/HelpApp.css";
import envData from "../store/env.json";

const HelpApp = ({ onBackClicked }) => {

  const handleCancel = () => {
    onBackClicked("ChatApp");
  };


  return (
    <div className="help-main">
      <button id="close-button" type="submit" onClick={handleCancel}>
        <IoCloseSharp />
      </button>
      <h2>Help</h2>
      <div className="help-points-wrapper">
        <div className="help-point">
          <p>You can add any number of codexes to choose from in the Settings tab. Don't hesitate to add your opponent's to avoid those pesky <em>gotchas</em>.</p>
        </div>
        <div className="help-point">
          <p>To have better results, try to be direct and more precise in your request.<br></br>For example:</p>
          <p><em>"Define the overwatch stratagem"</em> will give much better results than <em>"What is overwatch?"</em></p>
        </div>
        <div className="help-point">
          <p>Also, if the results are too vague or don't answer your question, try to select more specific sources.
            <br></br>You can change which sources are taken into account on the settings page.</p>
        </div>
      </div>
      <button className="back-button-wrapper" type="submit" onClick={handleCancel}>
        <p className="back-button-title">Back</p>
      </button>
    </div>
  );
};

export default HelpApp;