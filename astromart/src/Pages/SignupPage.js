import React from 'react';
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import {useScrollToTop} from "../Hooks/useScrollToTop";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";

export const SignupPage = () => {

    useScrollToTop();

    const [isVisible, setVisible] = useState(false)

    return (
        <div className="signup-page-box" >
      <div className="signup-box">
        <h1>Sign Up</h1>
        <div className="credentials">
        <RiContactsFill />
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="off"
          />
        </div>
        <div className="credentials">
        <FaUser />
          <input
            type="text"
            placeholder="Your Username"
            autoComplete="off"
          />
        </div>
        <div className="credentials">
        <HiMail />
          <input
            type="text"
            placeholder="Your Email address"
            autoComplete="off"
          />
        </div>
        <div className="credentials">
        <FaKey />
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Your Password"
            autoComplete="off"
          />
          <span className="eye-btn" onClick={() => setVisible(isVisible => !isVisible) }> {isVisible ? <FaEyeSlash /> : <FaEye /> }</span>
        </div>
        <button type="submit" className="login-btn"> Submit </button>
        <div>
        </div>
      </div>

    </div>
    )
}
