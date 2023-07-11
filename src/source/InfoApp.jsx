import React, { useState, useEffect } from "react";
import { IoCloseSharp, IoLogoGithub, IoCafeSharp } from "react-icons/io5";
import "../style/InfoApp.css";
import envData from "../store/env.json";

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
        <h2>Costs</h2>
        <p>On average, a conversation of a couple of messages costs 0.05€.</p>
        <p>I gladly cover the costs and have a limit setup for the costs not to worry about it.</p>
        <p>However, if you'd like to buy me a coffee and help with those, you can do it here:</p>
        <div style={{ textAlign: "center", width: 100 + "%" }}>
          <a className="inline-hyperlink-wrapper" href={envData.coffeeLink}><IoCafeSharp></IoCafeSharp></a>
        </div>
        <h2>Issues</h2>
        <p>If you want to report issues or have specific suggestions for features, you can do it here:</p>
        <div style={{ textAlign: "center", width: 100 + "%" }}>
          <a className="inline-hyperlink-wrapper" href={envData.issuesLink}><IoLogoGithub></IoLogoGithub></a>
        </div>
        <p></p>
      </div>
      <button className="back-button-wrapper" type="submit" onClick={handleCancel}>
        <p className="back-button-title">Back</p>
      </button>
    </div>
  );
};

export default InfoApp;