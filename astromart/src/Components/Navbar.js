import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import {FaBars} from "react-icons/fa";

export function Navbar() {
    return ( 
    <>
    <nav>
    <NavLink to="/"> 
    Navbar 
    </NavLink>
    {/* <Bars />
    <NavMenu>
        <NavLink to="/about" activeStyle>
            About
        </NavLink>
        <NavLink to="/services" activeStyle>
            Services
        </NavLink>
        <NavLink to="/contact-us" activeStyle>
            Contact Us
        </NavLink>
        <NavLink to="/sign-up" activeStyle>
            Sign up
        </NavLink>
    </NavMenu>
    <div>
        <NavBtnLink to="/signin"> Sign In </NavBtnLink>
    </div> */}
    </nav>
    </>
    )
}
