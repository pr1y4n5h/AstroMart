import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {

  const { isUserLoggedIn, loginUser} = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [credentials, setCredentials] = useState({
  //   username
  // })




  async function loginHandler() {
    loginUser(username, password)
    navigate(state?.from ? state.from : "/")
  }

  return (
    <div className="login-page-box">
      <div className="login-box">
        <h1>Login</h1>
        <div className="credentials">
          <input
            type="text"
            placeholder="Enter Username"
            autoComplete="off"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>
        <div className="credentials">
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button type="submit" className="login-btn" onClick={loginHandler}> Login </button>
      </div>

    </div>
  );
};
