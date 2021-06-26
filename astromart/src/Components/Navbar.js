import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import {FaBars} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";

export function Navbar() {

    return ( 
    <>
    <nav className="nav-main" >
    <NavLink 
    className="nav-btn"
    to="/"
    activeStyle={{color: "#15cdfc"}}  > 
    <FaRocket />
    </NavLink>
    <span className="nav-burger"  > <FaBars /> </span>
    <div className="nav-menu">
        <NavLink className="nav-btn" to="/" end activeStyle={{color: "var(--primary-color)"}}>
            Home
        </NavLink>
        <NavLink className="nav-btn" to="/products" activeStyle={{color: "var(--primary-color)"}}>
            Products
        </NavLink>
        <NavLink className="nav-btn" to="/contact-us" activeStyle={{color: "var(--primary-color)"}}>
            Contact Us
        </NavLink> 
        <NavLink className="nav-btn" to="/sign-up" activeStyle={{color: "var(--primary-color)"}}>
            Sign up
        </NavLink>
    </div>

    <div className="signin-btn">
    <NavLink className="signin-nav-btn" to="/signin"> Sign In </NavLink>
    </div>
    </nav>
    </>
    )
}
