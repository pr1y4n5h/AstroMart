import { createContext, useContext, useEffect, useState } from "react";
import { fakeAuthAPI } from "../DB";
import { useMainContext } from "../Contexts/MainContext";
import { toastText } from "../Components/Toast";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setLogin] = useState(false);
//   const { dispatchMain } = useMainContext();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage?.getItem("login"));
    loggedIn?.isUserLoggedIn && setLogin(true);
  }, []);

  async function loginUser(username, password) {
    // dispatchMain({ type: "SET_LOADER" });  
    try {
      const response = await fakeAuthAPI(username, password);
      if (response.success) {
        setLogin(true);
        toastText("You are Logged In now!");
        localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
      } else {
        toastText("Check your credentials");
      }
    } catch (error) {
      console.log(error);
    } 
  }

  async function logOutUser() {
    setLogin(false);
    localStorage.removeItem("login");
  }

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, loginUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
