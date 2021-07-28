import { createContext, useContext, useEffect, useState } from "react";
import { useMainContext } from "../Contexts/MainContext";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const { isUserLoggedIn, token: savedToken } = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null };

  const [isUserLogin, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
  const { state } = useLocation();
  const navigate = useNavigate();
//   const { dispatchMain } = useMainContext();


  async function loginUserWithCreds(username, password) {  
    try {
      const {username, password} = credentials;
      const {data, status} = await axios.post("http://localhost:5000/login", { username, password} );
      if (status === 200) {
        loginUser(data);
        return navigate(state?.from ? state.from : "/login")
        console.log(data)
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

  function loginUser({token}) {
    setCredentials("");
    setLogin(true);
    setToken(token);
    toastSuccessText("You are Logged In now !");
    localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true, token }));
  }

  async function logOutUser() {
    setLogin(false);
    localStorage.removeItem("login");
    setToken(null);
    toastFailText("You are Logged Out !");
  }

  return (
    <AuthContext.Provider value={{ isUserLogin, loginUserWithCreds, logOutUser, token, credentials, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
