import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"
import { IoCloseSharp } from "react-icons/io5";
import "../style/HelpApp.css";
import help_text_data from "../store/texts_files/help_texts.json"

const HelpApp = ({ onBackClicked }) => {

  const handleCancel = () => {
    onBackClicked("ChatApp");
  };


  return (
    <div className="help-main">
      <button id="close-button" type="submit" onClick={handleCancel}>
        <IoCloseSharp />
      </button>
      <h2>{help_text_data["help-text"][Cookies.get("lang")]}</h2>
      <div className="help-points-wrapper">
        <div className="help-point">
          <p dangerouslySetInnerHTML={{ __html: help_text_data["codexes-opp-text"][Cookies.get("lang")] }}></p>
        </div>
        <div className="help-point">
          <p dangerouslySetInnerHTML={{ __html: help_text_data["direct-1-text"][Cookies.get("lang")] }}></p>
          <p dangerouslySetInnerHTML={{ __html: help_text_data["direct-2-text"][Cookies.get("lang")] }}></p>
        </div>
        <div className="help-point">
          <p dangerouslySetInnerHTML={{ __html: help_text_data["sources-text"][Cookies.get("lang")] }}></p>
        </div>
      </div>
      <button className="back-button-wrapper" type="submit" onClick={handleCancel}>
        <p className="back-button-title">{help_text_data["back-text"][Cookies.get("lang")]}</p>
      </button>
    </div>
  );
};

export default HelpApp;