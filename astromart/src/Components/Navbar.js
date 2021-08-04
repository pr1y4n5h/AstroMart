import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { FaRocket, FaBars } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import { useAuth } from "../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../Contexts/ProductContext";

export function Navbar() {
  const { token, logOutUser } = useAuth();
  const { isDark, setDark } = useTheme();
  const { wishlist, cart } = useProducts();
  const navigate = useNavigate();
  const {state} = useLocation();

  function logInHandler() {
    navigate("/login");
  }

  function logOutHandler() {
    logOutUser();
    navigate(state?.from ? state.from : "/")
  }

  return (
    <>
      <nav
        className="nav-main"
        style={
          isDark
            ? { background: "var(--secondary-color)" }
            : { background: "var(--dark-color)" }
        }
      >
        <NavLink className="nav-btn" to="/">
          <FaRocket />
        </NavLink>
        <span className="nav-burger">
          <FaBars />
        </span>
        <div className="nav-menu">
          <NavLink
            className="nav-btn"
            to="/"
            end
            activeStyle={{ color: "var(--primary-color)" }}
          >
            Home
          </NavLink>
          <NavLink
            className="nav-btn"
            to="/products"
            activeStyle={{ color: "var(--primary-color)" }}
          >
            Products
          </NavLink>
          <NavLink
            className="nav-btn"
            to="/sign-up"
            activeStyle={{ color: "var(--primary-color)" }}
            style={token && { display: "none" }}
          >
            Sign up
          </NavLink>
        </div>
        <div className="signin-btn">
          <button
            className="primary-btn-1"
            onClick={token ? logOutHandler : logInHandler}
          >
            {token ? "Log Out" : "Log In"}
          </button>
        </div>

        <div className="nav-icons">
          <NavLink className="nav-icon" to="/wishlist">
            <FavoriteRoundedIcon style={{ color: "#fb3958" }} />
            
            {
              wishlist?.length > 0 && token &&
              <span className="item-count">{wishlist.length}</span>
            }
          </NavLink>
          <NavLink className="nav-icon" to="/cart">
            <ShoppingCartOutlinedIcon />
            {
              cart?.length > 0 &&  token &&
              <span className="item-count">{cart.length}</span>
            } 
          </NavLink>
          <span
            className="dark-btn"
            onClick={() => setDark((isDark) => !isDark)}
          >
            {
              <Brightness4RoundedIcon
                style={
                  !isDark
                    ? { color: "var(--base-color)" }
                    : { color: "var(--dark-color)" }
                }
              />
            }
          </span>
        </div>
      </nav>
    </>
  );
}
