import { createContext, useContext, useState } from "react";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import axios from "axios";
import {useProducts} from "./ProductContext"

export const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const userData = JSON.parse(localStorage?.getItem("user"));
  const savedToken = JSON.parse(localStorage?.getItem("token"))

  const [token, setToken] = useState(savedToken);
  const [loggedUser, setLoggedUser] = useState(userData);

  // if (token) {
  //   console.log("token set");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }

  // axios.interceptors.response.use(undefined, function (error) {
  //   if (
  //     error.response.status === 401 ||
  //     error.response.status === 403 ||
  //     error.response.data.message === "Invalid Token"
  //   ) {
  //     logOutUser();
  //   }
  //   return Promise.reject(error);
  // });


  async function loginUserWithCreds(username, password) {
    try {
      const {username, password} = credentials;
      const {data, status} = await axios.post("https://astromart-backend.herokuapp.com/login", { username, password} );
      if (status === 200) {
        loginUser(data);
        return { status, success: data.success, user: data.userData }
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
        password: "test@123" 
      }
      const {data, status} = await axios.post("https://astromart-backend.herokuapp.com/login", { username, password } );
      if (status === 200) {
        loginUser(data);
      }
    } catch (error) {
        console.log(error);
      } 
  }

  function loginUser({token, userData}) {
    setToken(token);
    setLoggedUser(userData);
    localStorage?.setItem("token", JSON.stringify(token));
    localStorage?.setItem("user", JSON.stringify(userData))
  }

  async function logOutUser() {
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    setLoggedUser(null);
    setToken(null);
    toastFailText("You are Logged Out !");
  }

  return (
    <AuthContext.Provider value={{ loginUserWithCreds, loginUserAsGuest, loggedUser, logOutUser, token, credentials, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
