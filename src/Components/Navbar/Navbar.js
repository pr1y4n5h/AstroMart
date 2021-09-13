import "./Navbar.styles.css";
import { FaRocket } from "react-icons/fa";
import { FavoriteRounded, ShoppingCartOutlined } from "@material-ui/icons";
import { useAuth } from "../../Contexts/AuthContext";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useProducts } from "../../Contexts/ProductContext";
import { useState } from "react";

export function Navbar() {
  const [isResponsive, setResponsive] = useState(false);
  const { token, logOutUser } = useAuth();
  const { wishlist, cart, dispatchProduct } = useProducts();
  const navigate = useNavigate();
  const { state } = useLocation();

  function logInHandler() {
    navigate("/login");
  }

  function logOutHandler() {
    dispatchProduct({ type: "FLUSH_CART" });
    dispatchProduct({ type: "FLUSH_WISHLIST" });
    logOutUser();
    navigate(state?.from ? state.from : "/");
  }

  return (
    <>
      <nav className="nav-main">
        <ul
          className={isResponsive ? "nav-links-mobile" : "nav-menu"}
          onClick={() => setResponsive(false)}
        >
          <span className="nav-logo-span">
            <NavLink className="nav-logo" to="/">
              <FaRocket />
            </NavLink>
          </span>

          <NavLink
            className="nav-btn"
            to="/"
            end
            activeStyle={
              isResponsive
                ? { color: "var(--base-color)" }
                : { color: "var(--primary-color)", fontWeight: "bolder" }
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            className="nav-btn"
            to="/products"
            activeStyle={
              isResponsive
                ? { color: "var(--base-color)" }
                : { color: "var(--primary-color)", fontWeight: "bolder" }
            }
          >
            <li>Products</li>
          </NavLink>

          {!token && (
            <NavLink
              className="nav-btn"
              to="/sign-up"
              activeStyle={
                isResponsive
                  ? { color: "var(--base-color)" }
                  : { color: "var(--primary-color)", fontWeight: "bolder" }
              }
            >
              <li>Sign up</li>
            </NavLink>
          )}

          {token && isResponsive && (
            <span
              className="nav-btn"
              onClick={logOutHandler}
              style={{ color: "var(--base-color)" }}
            >
              <li>Log out</li>
            </span>
          )}
        </ul>

        <div className="nav-icons">
          <NavLink className="nav-icon" to="/wishlist">
            <FavoriteRounded style={{ color: "#fb3958" }} />

            {wishlist?.length > 0 && token && (
              <span className="item-count">{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink className="nav-icon" to="/cart">
            <ShoppingCartOutlined />
            {cart?.length > 0 && token && (
              <span className="item-count">{cart.length}</span>
            )}
          </NavLink>

          <div className="login-btnn">
            <button
              className="primary-btn-1"
              onClick={token ? logOutHandler : logInHandler}
            >
              {token ? "Log Out" : "Log In"}
            </button>
          </div>
        </div>

        <button
          onClick={() => setResponsive((responsive) => !responsive)}
          className="mobile-menu-icon"
        >
          {isResponsive ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </nav>
    </>
  );
}
