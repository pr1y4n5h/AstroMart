import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useMainContext } from "../../Contexts/MainContext";
import { useProducts } from "../../Contexts/ProductContext";
import React from "react";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { toastSuccessText, toastFailText } from "../../Components/Toast";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import "./LoginPage.styles.css"

export const LoginPage = () => {
  useScrollToTop();
  usePageTitle("AstroMart || Login");

  const { state } = useLocation(); 
  const navigate = useNavigate();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { loginUserWithCreds, loginUserAsGuest, credentials, setCredentials } =
    useAuth();
  const [isVisible, setVisible] = useState(false);
  // const {loader} = useMainContext();

  async function loginHandler() {
    const { username, password } = credentials;
    try {
      const response = await loginUserWithCreds(username, password);
      if (response.success === true) {
        setCredentials("");
        navigate(state?.from ? state.from : "/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loginAsGuestHandler() {
    await loginUserAsGuest();
    toastSuccessText("You are Logged In now !");
    navigate(state?.from ? state.from : "/");
  }

  return (
    <div className="login-page-box">
      <div className="login-box">
        <h1 className="login-heading">Login</h1>
        <div className="credentials">
          <FaUser />
          <input
            type="text"
            placeholder="Enter Username"
            ref={inputRef}
            value={credentials.username}
            onChange={(event) =>
              setCredentials({ ...credentials, username: event.target.value })
            }
          />
        </div>
        <div className="credentials">
          <FaKey />
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Enter Password"
            value={credentials.password}
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
          />
          <span
            className="eye-btn"
            onClick={() => setVisible((isVisible) => !isVisible)}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="login-btn" onClick={loginHandler}>
          Login
        </button>
        <div className="login-lower">
          <NavLink className="signup-link" to="/sign-up">
            Don't have account?
          </NavLink>
          <span className="signup-link" onClick={loginAsGuestHandler}>
            Login as Guest
          </span>
        </div>
      </div>
    </div>
  );
};
