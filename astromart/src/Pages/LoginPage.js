import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import {useScrollToTop} from "../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";


export const LoginPage = () => {
  useScrollToTop();

  const { loginUserWithCreds } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isVisible, setVisible] = useState(false)

  async function loginHandler() {
    const {username, password} = credentials;
    loginUserWithCreds(username, password)

    // navigate(state?.from ? state.from : "/")
  }

  return (
    <div className="login-page-box" >
      <div className="login-box">
        <h1 className="login-heading">Login</h1>
        <div className="credentials">
        <FaUser />
          <input
            type="text"
            placeholder="Enter Username"
            autoComplete="off"
            value={credentials.username}
            onChange={(event) => setCredentials({...credentials, username: event.target.value})}
          />
        </div>
        <div className="credentials">
        <FaKey />
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Enter Password"
            autoComplete="off"
            value={credentials.password}
            onChange={(event) => setCredentials({...credentials, password: event.target.value})}
          />
          <span className="eye-btn" onClick={() => setVisible(isVisible => !isVisible) }> {isVisible ? <FaEyeSlash /> : <FaEye /> }</span>
        </div>
        <button type="submit" className="login-btn" onClick={loginHandler}> Login </button>
        <div className="login-lower">
          <NavLink className="signup-link" to="/sign-up"> Don't have account? </NavLink>
          <span > Login as Guest </span>
        </div>
      </div>

    </div>
  );
};
