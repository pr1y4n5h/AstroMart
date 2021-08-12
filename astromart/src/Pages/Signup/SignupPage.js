import React, { useEffect, useState, useRef } from "react";
import { useProducts } from "../../Contexts/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import axios from "axios";
import { toastSuccessText, toastFailText } from "../../Components/Toast";
import {usePageTitle} from "../../Hooks/usePageTitle";
import "./SignupPage.style.css"

export const SignupPage = () => {

  useScrollToTop();
  usePageTitle("AstroMart || Sign up")

  const inputRef = useRef(null);

  useEffect(() => {  
    inputRef.current.focus();
  }, [])

  const { dispatchProduct, loader } = useProducts();
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
    dispatchProduct({ type: "SET_LOADER" });
    try {
      const { name, username, email, password } = user;

      const { data, status } = await axios.post(
        "https://astromart-backend.herokuapp.com/sign-up",
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
      if (error.response.status === 422) {
        toastFailText("Username/password already exists!");
      } else if (error.response.status === 409) {
        toastFailText(error.response.data.message);
      } else {
        toastFailText("Something went wrong! Please try later...");
      }
    } finally {
      dispatchProduct({ type: "SET_LOADER" });
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
              ref={inputRef}
              placeholder="Your Name"
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
            {loader ? "Submitting..." : "Register"}
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
