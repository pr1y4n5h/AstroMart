import { useState } from "react";

export const LoginPage = () => {

  const initialState = {
    username: "",
    password: ""
  }

  const [{username, password}, setCredentials] = useState(initialState);

  return (
    <div className="login-page-box">
      <div className="login-box">
        <h1>Login</h1>
        <div className="credentials">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(evt) => setCredentials(evt.target.value)}
          />
        </div>
        <div className="credentials">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(evt) => setCredentials(evt.target.value)}
          />
        </div>
        <button className="login-btn"> Login </button>
      </div>
    </div>
  );
};
