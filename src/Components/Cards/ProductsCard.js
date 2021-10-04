import React from "react";
import "./ProductsCard.style.css";
import { GradeRounded, FavoriteBorder, Favorite } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../Contexts/ProductContext";
import { toastSuccessText, toastFailText } from "../Toast";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";

export const ProductsCard = ({ product }) => {
  const { token, loggedUser } = useAuth();
  const { _id, name, image, price, off, rating, stock, deluxe } = product;
  const { dispatchProduct, wishlist, cart } = useProducts();

  const navigate = useNavigate();

  const isWishlisted = () => wishlist?.some((item) => item._id === product._id);

  const wishlistHandler = async () => {
    if (token) {
      if (isWishlisted()) {
        try {
          const response = await axios.post(
            `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}/${_id}`,
            {
              type: "REMOVE",
            },
            { headers: { authorization: token } }
          );
          dispatchProduct({ type: "REMOVE_FROM_WISHLIST", payload: product });
          toastFailText("Item removed from Wishlist!");
          console.log(wishlist);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await axios.post(
            `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}/${_id}`,
            {
              type: "ADD",
            },
            { headers: { authorization: token } }
          );
          dispatchProduct({ type: "ADD_TO_WISHLIST", payload: product });
          toastSuccessText("Item added to Wishlist!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toastFailText("Please login to continue!");
    }
  };

  const isInCart = cart?.find((item) => item._id === product._id);

  const cartHandler = async () => {
    if (token) {
      if (isInCart) {
        navigate("/cart");
      } else {
        try {
          const response = await axios.post(
            "https://astromart-backend.herokuapp.com/cart/",
            {
              userId: loggedUser._id,
              product: product._id,
              quantity: 1,
            },
            { headers: { authorization: token } }
          );
          dispatchProduct({ type: "ADD_TO_CART", payload: product });
          toastSuccessText("Item Added to Cart!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toastFailText("Please login to continue!");
    }
  };

  return (
    <div className="product-card">
      <div
        className="ribbon"
        style={!deluxe ? { display: "none" } : { display: "block" }}
      >
        <span>Deluxe</span>
      </div>
      <Link to={`/products/${_id}`}>
        <div
          className={`${
            stock ? "product-card-top" : "product-card-top-nostock"
          } `}
        >
          <img src={image} alt={name} />
          <span className="sold-text"> SOLD! </span>
        </div>
      </Link>
      <span className="card-wishlist-btn" onClick={wishlistHandler}>
        {isWishlisted() && token ? (
          <Favorite style={{ color: "#fb3958" }} />
        ) : (
          <FavoriteBorder style={{ color: "#fb3958" }} />
        )}
      </span>

      <div className="product-card-body">
        <h3 className="product-name"> {name.toUpperCase()} </h3>
        <div className="product-card-details">
          <div>
            <GradeRounded
              style={
                rating >= 4
                  ? { color: "var(--green-color)" }
                  : rating > 3 && rating < 4
                  ? { color: "var(--orange-color)" }
                  : { color: "var(--red-color)" }
              }
            />
            {rating}
          </div>
          <div>
            <span> {off}% Off </span>
          </div>
          <span className="product-price"> &#8377; {price} </span>
        </div>
        <div
          className="product-card-bottom"
          style={!stock ? { display: "none" } : { display: "null" }}
        >
          <button
            className={isInCart && token ? "secondary-btn-1" : "primary-btn-1"}
            onClick={cartHandler}
            style={{ marginTop: "0.5rem" }}
          >
            {isInCart && token ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
