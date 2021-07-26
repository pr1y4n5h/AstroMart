import { createContext, useContext, useEffect, useState } from "react";
import { useMainContext } from "../Contexts/MainContext";
// import { toastText } from "../Components/Toast";
import axios from "axios";

export const AuthContext = createContext();

// function loginWithApi() {
//   return axios.post("http://localhost:5000/login"), {
//     user: {username: "abc", password: "123"}
//   }
// }


export function AuthProvider({ children }) {

  const { isUserLoggedIn, token: savedToken } = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null };

  const [isUserLogin, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
//   const { dispatchMain } = useMainContext();


  async function loginUserWithCreds(username, password) {
    // dispatchMain({ type: "SET_LOADER" });  
    try {
      const response = await axios.post("http://localhost:5000/login", { data : { username, password}} );
      if (response.status === 200) {
        loginUser(response.data)
      } else {
        // toastText("Check your credentials");
      }
    } catch (error) {
      console.log(error);
    } 
  }

  function loginUser({token}) {
    setLogin(true);
    setToken(token);
    // toastText("You are Logged In now!");
    localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true, token }));
  }

  async function logOutUser() {
    setLogin(false);
    localStorage.removeItem("login");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isUserLogin, loginUserWithCreds, logOutUser, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
