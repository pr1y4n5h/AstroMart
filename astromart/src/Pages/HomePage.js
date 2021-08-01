import React from "react";
import { useAuth } from "../Contexts/AuthContext";

import { usePageTitle } from "../Hooks/usePageTitle";

export const HomePage = () => {
  
    usePageTitle("AstroMart || Home")
  const { loggedUserInfo, isUserLogin } = useAuth();

  return (
    <div>
      <h1>Working on Homepage</h1>
      {isUserLogin && <h1>Welcome {loggedUserInfo.name} </h1>}
    </div>
  );
};


