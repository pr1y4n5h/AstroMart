import React from "react";
import "../App.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { Link } from "react-router-dom";
import { useProducts } from "../Contexts/ProductContext";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import { useAuth } from "../Contexts/AuthContext";
import { addToWishlist, removeFromWishlist } from "../API/Wishlist";
import axios from "axios";
import {useNavigate} from "react-router-dom";


// export function WishlistButton({ buttonID }) {
//   const { isUserLogin, loggedUser } = useAuth();
//   const { dispatchProduct, wishlist } = useProducts();

//   async function wishlistHandler() {

//     function checkWishlist(productID, wishlist) {
//       return wishlist?.find((item) => item.product._id === productID);
//     }

//     const isWishlisted = checkWishlist(buttonID, wishlist);

//     if(isUserLogin) {

//       if (isWishlisted) {
//         removeFromWishlist(loggedUser._id, buttonID)
//         dispatchProduct({ type: "REMOVE_FROM_WISHLIST" });
//       } else {
//         addToWishlist(loggedUser._id, buttonID);
//         dispatchProduct({ type: "ADD_TO_WISHLIST" });
//       }
//     }

//     else {
//     toastFailText("Please login")
//     }
//   }

//   return (
//     <>
//       <span className="card-wishlist-btn" onClick={wishlistHandler}>
//         {/* {isWishlisted ? (
//           <FavoriteIcon style={{ color: "#fb3958" }} />
//         ) : (
//           <FavoriteBorderIcon style={{ color: "#fb3958" }} />
//         )} */}
//         Wishlist
//       </span>
//     </>
//   );
// }

export const ProductsCard = ({ product }) => {

    const { token, loggedUser } = useAuth();
    const { _id, name, image, price, off, rating, stock, deluxe } = product;
    const { dispatchProduct, products, wishlist, cart } = useProducts();
    const navigate = useNavigate();

    const isWishlisted = () => wishlist?.some(item => item._id === product._id);

      const wishlistHandler = async () => {

        if(token) {
          if(isWishlisted()) {
            try {
              const response = await axios.post(`http://localhost:5000/wishlist/${loggedUser._id}/${_id}`, {
                type: "REMOVE"
              }, { headers: { authorization: token } })
              dispatchProduct({ type: "REMOVE_FROM_WISHLIST", payload: product})
              toastFailText("Item removed from Wishlist!")
              console.log(wishlist)
            }
            catch (err) {
              console.log(err);
            }
          }
          else {
            try {
              const response = await axios.post(`http://localhost:5000/wishlist/${loggedUser._id}/${_id}`, {
                type: "ADD"
              }, { headers: { authorization: token } })
              dispatchProduct({ type: "ADD_TO_WISHLIST", payload: product})
              toastSuccessText("Item added to Wishlist!")
            }
            catch (err) {
              console.log(err);
            }
          }
        }
        else {
          toastFailText("Please login to continue!")
        }
      }

    const isInCart = cart?.find(item => item._id === product._id );

    const cartHandler = async () => {
      if(isInCart) {
        navigate("/cart")
      } else {
        try {
          const response = await axios.post("http://localhost:5000/cart/", {
            userId: loggedUser._id,
            product: product._id,
            quantity: 1,
          })
          dispatchProduct({ type: "ADD_TO_CART", payload: product})
          toastSuccessText("Item Added to Cart!")
        }
        catch (err) {
          console.log(err)
        }
      }
      }

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
             <span className="card-wishlist-btn" onClick={wishlistHandler}>
         {isWishlisted() ? (
           <FavoriteIcon style={{ color: "#fb3958" }} />
         ) : (
           <FavoriteBorderIcon style={{ color: "#fb3958" }} />
         )}
       </span>

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
            className={isInCart ? "secondary-btn-1" : "primary-btn-1"}
            onClick={cartHandler}
          >
            { isInCart ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
