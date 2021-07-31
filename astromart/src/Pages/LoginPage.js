import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext"; 
import { NavLink } from "react-router-dom";
import { useScrollToTop } from "../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import {MyLoader} from "../Components/Loader"
import {useMainContext} from "../Contexts/MainContext"

 
export const LoginPage = () => {
  useScrollToTop();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { loginUserWithCreds, loginUserAsGuest, loggedUserInfo, credentials, setCredentials } = useAuth();
  const { username, password } = credentials;
  const [isVisible, setVisible] = useState(false);
  const {loader} = useMainContext();

  

  async function loginHandler() {
    loginUserWithCreds(username, password);
  }

  console.log(loggedUserInfo);

  // console.log(loggedUserInfo);

  async function loginAsGuestHandler() {
    loginUserAsGuest();
    // navigate(state?.from ? state.from : "/")
  }

  return (
    <div className="login-page-box">
    {loader && <MyLoader />}
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
          <span className="signup-link" onClick={loginAsGuestHandler}> Login as Guest </span>
        </div>
      </div>
    </div>
  );
};
