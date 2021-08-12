import React from "react";
import "./HomePage.style.css"
import { usePageTitle } from "../../Hooks/usePageTitle";

export const HomePage = () => {

    usePageTitle("AstroMart || Home")

  return (
    <div className="home-page">
    This is Home Page
    </div>
  );
};


