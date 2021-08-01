import React from "react";
import "../App.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { Link } from "react-router-dom";
import { useProducts } from "../Contexts/ProductContext";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import { useMainContext } from "../Contexts/MainContext";
import { useAuth } from "../Contexts/AuthContext";
import { addToWishlist, removeFromWishlist } from "../API/Wishlist";

export function WishlistButton({ buttonID }) {
  const { isUserLogin, loggedUserInfo } = useAuth();
  const { dispatchProduct, wishlist } = useProducts();

  async function wishlistHandler() {

    function checkWishlist(productID, wishlist) {
      return wishlist.some((item) => item.product._id === productID);
    }

    const isWishlisted = checkWishlist(buttonID, wishlist);

    if(isUserLogin) {

      if (isWishlisted) {
        removeFromWishlist(loggedUserInfo._id, buttonID)
        dispatchProduct({ type: "REMOVE_FROM_WISHLIST" });
      } else {
        addToWishlist(loggedUserInfo._id, buttonID);
        dispatchProduct({ type: "ADD_TO_WISHLIST" });
      }
    }

    else {
    toastFailText("Please login")
    }
    
  }

  return (
    <>
      <span className="card-wishlist-btn" onClick={wishlistHandler}>
        {/* {isWishlisted ? (
          <FavoriteIcon style={{ color: "#fb3958" }} />
        ) : (
          <FavoriteBorderIcon style={{ color: "#fb3958" }} />
        )} */}
        Wishlist
      </span>
    </>
  );
}

export const ProductsCard = ({ product }) => {
  const { _id, name, image, price, off, rating, stock, deluxe } = product;

  const { dispatchProduct, wishlist } = useProducts();
  const { products } = useMainContext();

  return (
    <div className="product-card">
      <div
        class="ribbon"
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

      <WishlistButton buttonID={_id} />

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
          <button
            className="primary-btn-1"
            onClick={() =>
              dispatchProduct({ type: "ADD_TO_CART", payload: product })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
