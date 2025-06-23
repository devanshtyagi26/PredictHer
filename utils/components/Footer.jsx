import React from "react";
import "../../css/footer.css";
import HomeIcon from "./icons/Home";
import CalendarIcon from "./icons/Calendar";
import AnalysisIcon from "./icons/Analysis";
import ProfileIcon from "./icons/Profile";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="left">
          <HomeIcon />
          <CalendarIcon />
        </div>
        <div className="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            className="plus"
          >
            <path
              d="M14.3848 6.2262V22.8356"
              stroke="#FFFDFD"
              strokeWidth="1.83133"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.08009 14.5309H22.6895"
              stroke="#FFFDFD"
              strokeWidth="1.83133"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="right">
          <AnalysisIcon />
          <ProfileIcon />
        </div>
      </div>
    </>
  );
}

export default Footer;
