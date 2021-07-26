import React from "react";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useMainContext } from "../Contexts/MainContext";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useScrollToTop } from "../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import axios from "axios";
import { toastSuccessText, toastFailText } from "../Components/Toast";

export const SignupPage = () => {
  useScrollToTop();
  const { dispatchMain } = useMainContext();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatchMain({ type: "SET_LOADER" });
    try {
      const { name, username, email, password } = user;

      const { data, status } = await axios.post(
        "http://localhost:5000/sign-up",
        {
          name,
          username,
          email,
          password,
        }
      );

      if (data.success === true && status === 200) {
        toastSuccessText(data.message + " 🔥 ");
        return navigate("/login");
      }
    } catch (error) {
      toastFailText("Something went wrong!");
    } finally {
      dispatchMain({ type: "SET_LOADER" });
    }
  };

  return (
    <div className="signup-page-box">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form method="POST" className="signup-form">
          <div className="credentials">
            <RiContactsFill />
            <input
              type="text"
              placeholder="Your Name"
              autoComplete="off"
              value={user.name}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
            />
          </div>
          <div className="credentials">
            <FaUser />
            <input
              type="text"
              placeholder="Your Username"
              autoComplete="off"
              value={user.username}
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            />
          </div>
          <div className="credentials">
            <HiMail />
            <input
              type="text"
              placeholder="Your Email address"
              autoComplete="off"
              value={user.email}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
          </div>
          <div className="credentials">
            <FaKey />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Your Password"
              autoComplete="off"
              value={user.password}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
            <span
              className="eye-btn"
              onClick={() => setVisible((isVisible) => !isVisible)}
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="login-btn" onClick={registerHandler}>
            Register
          </button>
          <div className="already-registered">
            <NavLink className="login-link" to="/login">
              Already registered?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
