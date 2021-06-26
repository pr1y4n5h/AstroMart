import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import {FaBars} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";

const normalStyle = {
    color: "#fff", 
    textDecoration: "none", 
    display: "flex", 
    alignItems: "center", 
    height: "100%", 
    padding: "0 1rem",
    fontSize: "1.5rem"}

export function Navbar() {
    return ( 
    <>
    <nav className="nav-main" >
    <NavLink 
    to="/"
    style={normalStyle}
    activeStyle={{color: "#15cdfc"}}  > 
    <FaRocket />
    </NavLink>
    <span className="nav-burger"> <FaBars /> </span>
    <div className="nav-menu">
        <NavLink to="/" end style={normalStyle} activeStyle={{color: "#15cdfc"}}>
            Home
        </NavLink>
        <NavLink to="/products" style={normalStyle} style={normalStyle} activeStyle={{color: "#15cdfc"}}>
            Products
        </NavLink>
        <NavLink to="/contact-us" style={normalStyle} activeStyle={{color: "#15cdfc"}}>
            Contact Us
        </NavLink> 
        <NavLink to="/sign-up" style={normalStyle} activeStyle={{color: "#15cdfc"}}>
            Sign up
        </NavLink>
    </div>

    <div className="nav-btn">
    <NavLink className="signin-btn" to="/signin"> Sign In </NavLink>
    </div>

    {/* <NavBtn>
        <NavBtnLink to="/signin"> Sign In </NavBtnLink>
    </NavBtn> */}
    </nav>
    </>
    )
}
