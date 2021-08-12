import React from "react";
import { useParams } from "react-router-dom";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import "./ProductDetails.style.css";
import {useProducts} from "../../Contexts/ProductContext"  
import {useScrollToTop} from "../../Hooks/useScrollToTop"
import axios from "axios";
import { toastSuccessText, toastFailText } from "../../Components/Toast";
import { useAuth } from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export const ProductDetails = () => {

  useScrollToTop(); 

  const { cart, products, wishlist, dispatchProduct } = useProducts();

  const { productID } = useParams();

  const navigate = useNavigate();

  const { isUserLogin, loggedUser } = useAuth();
  // const {_id: userId } = loggedUserInfo

  const product = products.find((product) => product._id === productID);

    const isInCart = cart?.find(item => item._id === productID);
    
    const cartHandler = async () => {
      if(isInCart) {
        navigate("/cart")
      } else {
        try {
          const response = await axios.post("https://astromart-backend.herokuapp.com/cart/", {
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



      const isWishlisted = () => wishlist?.some(item => item._id === productID);

      const wishlistHandler = async () => {

        if(isWishlisted()) {
          try {
            const response = await axios.post(`https://astromart-backend.herokuapp.com/wishlist/${productID}`, {
              type: "REMOVE"
            })
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
            const response = await axios.post(`https://astromart-backend.herokuapp.com/wishlist/${productID}`, {
              type: "ADD"
            })
            dispatchProduct({ type: "ADD_TO_WISHLIST", payload: product})
            toastSuccessText("Item added to Wishlist!")
          }
          catch (err) {
            console.log(err);
          }
        }
        
      }

      const {name, image, price, off, rating, details, category, deluxe } = product

      const mrp = Math.round((price*100)/(100-off));
      const savings = Math.round(mrp - price);


  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={image} alt={name} />
        <div class="ribbon" style={!deluxe ? {display:"none"} : {display:"block"}} ><span>Deluxe</span></div>

      </div>

      <div className="product-details-content">
        <span className="product-details-heading"> {name} </span>
        <div className="product-rating-div" style={
              rating >= 4
                ? { color: "var(--green-color)" }
                : rating > 3 && rating < 4
                ? { color: "var(--orange-color)" }
                : { color: "var(--red-color)" }
            }>
          <GradeRoundedIcon
          />
          <b className="product-rating-text">{rating}</b>
        </div>
        <div> Category : {category} </div>
        <p className="product-details-description"> {details} </p>

        <div className="product-details-pricing"> 
        <div> MRP: <span className="product-details-mrp"> &#8377; {mrp} </span> </div>
        <div> Our Deal: <span className="product-details-price" > &#8377; {price}   </span></div>
        <div className="product-details-savings-div"> Savings: <span className="product-details-savings"> &#8377; {savings} ({off}%) </span> </div>
      </div>

      <div classname="product-details-buttons" > 
      <button onClick={cartHandler} className={isInCart ? "secondary-btn-1" : "primary-btn-1"}> {isInCart ? "Go to Cart" : "Add to Cart"} </button> 
      <button className="secondary-btn-1" onClick={wishlistHandler} > {isWishlisted() ? "Remove from Wishlist" : "Move to Wishlist"} </button> 
      </div>
    </div>
    </div>
  );
};
