import { createContext, useContext, useEffect, useState } from "react";
// import { useMainContext } from "../Contexts/MainContext";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const { isUserLoggedIn, token: savedToken, loggedUserInfo: userData } = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null, loggedUserInfo: null };

  const [isUserLogin, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
  const [loggedUserInfo, setLoggedUserInfo] = useState(userData);
  const { state } = useLocation();
  const navigate = useNavigate();
  // const { dispatchMain } = useMainContext();


  async function loginUserWithCreds(username, password) {
    try {
      const {username, password} = credentials;
      const {data, status} = await axios.post("http://localhost:5000/login", { username, password} );
      if (status === 200) {
        loginUser(data);
      } else {
        toastFailText("Please check your credentials");
      }
    } catch (error) {
      if(error.response.status === 409) {
        toastFailText("Please fill complete credentials!");
      }
      else if(error.response.status === 401) {
        toastFailText("Invalid credentials!!!");
      }
      else {
        console.log(error);
      }
    }
  }

  async function loginUserAsGuest() {
    try {
      const {username, password} = {
        username: "guest",
        password: "test123" 
      }
      const {data, status} = await axios.post("http://localhost:5000/login", { username, password} );
      if (status === 200) {
        loginUser(data);
      }
    } catch (error) {
        console.log(error);
      } 
  }

  function loginUser({token, userData}) {
    setLogin(true);
    setToken(token);
    setLoggedUserInfo(userData);
    toastSuccessText("You are Logged In now !");
    localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true, token, loggedUserInfo: userData }));
    // navigate(state?.from ? state.from : "/")
  }

  async function logOutUser() {
    setLogin(false);
    localStorage.removeItem("login");
    setLoggedUserInfo(userData);
    setToken(null);
    toastFailText("You are Logged Out !");
  }

  return (
    <AuthContext.Provider value={{ isUserLogin, loginUserWithCreds, loginUserAsGuest, loggedUserInfo, logOutUser, token, credentials, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
