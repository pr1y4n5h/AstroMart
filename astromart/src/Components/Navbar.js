import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import {FaBars} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";
import {useTheme} from "../Contexts/ThemeContext";
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';


export function Navbar() {

    const { isDark, setDark } = useTheme();

    return ( 
    <>
    <nav className="nav-main" style={ isDark ? { background: "var(--secondary-color)"} : { background: "var(--dark-color)"} } >
    <NavLink 
    className="nav-btn"
    to="/" > 
    <FaRocket />
    </NavLink>
    <span className="nav-burger" > <FaBars /> </span>
    <div className="nav-menu" >
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
    <NavLink className="primary-btn-1" to="/signin"> Sign In </NavLink>
    </div>
    <div className="nav-icons" >
    <NavLink className="nav-icon" to="/wishlist" > <FavoriteRoundedIcon style={{color: "#fb3958"}} /> </NavLink>
    <NavLink className="nav-icon" to="/cart" > <ShoppingCartOutlinedIcon /> </NavLink>
    <span className="dark-btn"  onClick={() => setDark(isDark => !isDark ) } > { <Brightness4RoundedIcon style={ !isDark ? {color: "var(--base-color)"} : {color: "var(--dark-color)"}} />} </span>
    </div>
    </nav>
    </>
    )
}
