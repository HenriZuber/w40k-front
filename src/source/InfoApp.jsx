import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IoCloseSharp, IoLogoGithub, IoCafeSharp } from "react-icons/io5";
import "../style/InfoApp.css";
import envData from "../store/env.json";
import info_text_data from "../store/texts_files/info_texts.json"

const InfoApp = ({ onBackClicked }) => {

  const handleCancel = () => {
    onBackClicked("ChatApp");
  };


  return (
    <div className="info-main">
      <button id="close-button" type="submit" onClick={handleCancel}>
        <IoCloseSharp />
      </button>
      <div>
        <h2>{info_text_data["costs-text"][Cookies.get("lang")]}</h2>
        <p>{info_text_data["costs-1-text"][Cookies.get("lang")]}</p>
        <p>{info_text_data["costs-2-text"][Cookies.get("lang")]}</p>
        <p>{info_text_data["costs-3-text"][Cookies.get("lang")]}</p>
        <div style={{ textAlign: "center", width: 100 + "%" }}>
          <a className="inline-hyperlink-wrapper" href={envData.coffeeLink}><IoCafeSharp></IoCafeSharp></a>
        </div>
        <h2>{info_text_data["issues-text"][Cookies.get("lang")]}</h2>
        <p>{info_text_data["issues-1-text"][Cookies.get("lang")]}</p>
        <div style={{ textAlign: "center", width: 100 + "%" }}>
          <a className="inline-hyperlink-wrapper" href={envData.issuesLink}><IoLogoGithub></IoLogoGithub></a>
        </div>
        <p></p>
      </div>
      <button className="back-button-wrapper" type="submit" onClick={handleCancel}>
        <p className="back-button-title">{info_text_data["back-text"][Cookies.get("lang")]}</p>
      </button>
    </div>
  );
};

export default InfoApp;