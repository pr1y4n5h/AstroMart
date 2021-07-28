import React from "react";
import "../App.css"; 
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { Link } from "react-router-dom"; 

export const WishlistCard = ({ wishlistData }) => {

  const { _id, name, image, price, off, rating, stock } = wishlistData;

  return (
    <div className="product-card">
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
        <FavoriteIcon
          className="card-wishlist-btn"
          style={{ color: "#fb3958" }}
        />
      <div className="product-card-body">
        <div className="product-name"> {name} </div>
        <div className="product-card-details">
          <div>
            <GradeRoundedIcon
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
          <button className="primary-btn-1"> Add to Cart </button>
        </div>
      </div>
    </div>
  );
};
