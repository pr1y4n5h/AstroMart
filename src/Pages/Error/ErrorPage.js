import React from "react";
import { NavLink } from "react-router-dom";
import "./ErrorPage.style.css"
import { usePageTitle } from "../../Hooks/usePageTitle";

export const ErrorPage = () => {
  usePageTitle("Error Page!");
  return (
    <div className="errorPage-box">
      <div className="message404">
        <div>
          <h1>OOOPS! It's a 404 </h1>
          <h3>
            We are not sure how you got here... But you may be lost in the
            Cyberspace...!
          </h3>
        </div>
        <div className="home404">
          <NavLink to="/" className="secondary-btn-1">
            Return to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};
