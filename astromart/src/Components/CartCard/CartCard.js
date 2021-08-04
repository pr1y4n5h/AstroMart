import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import axios from "axios";
import {useProducts} from "../../Contexts/ProductContext"
import {useAuth} from "../../Contexts/AuthContext";
import { toastSuccessText, toastFailText } from "../../Components/Toast";

export const CartCard = ({ product }) => {

  const { _id, name, image, price, off, deluxe, category, rating, quantity } = product;
  const {loggedUser} = useAuth();
  const {dispatchProduct, cart} = useProducts();

  const mrp = Math.round((price * 100) / (100 - off));
  const savings = Math.round(mrp - price);

  const increaseQty = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/cart/${loggedUser._id}/${_id}`,
        {
          quantity: quantity + 1
        }
      )

      dispatchProduct({ type: "INCREMENT_QTY", payload: product})
    }
    catch (err) {
      console.log(err);
    }
  }

  const decreaseQty = async () => {
    if(quantity == 1) {
      toastFailText("Item Removed from Cart!")
    }
    try {
      const response = await axios.post(`http://localhost:5000/cart/${loggedUser._id}/${_id}`,
        {
          quantity: quantity - 1
        }
      )

      dispatchProduct({ type: "DECREMENT_QTY", payload: product })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="cart-card">
      <div className="cart-img-div">
        <img src={image} alt={name} />
        <div
          class="ribbon"
          style={!deluxe ? { display: "none" } : { display: "block" }}
        >
          <span>Deluxe</span>
        </div>
      </div>
      <div className="cart-card-body">
        <div className="cart-details-heading">
          <h2> {name} </h2>
        </div>
        <div className="cart-card-details">
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
          <div>Category : {category}</div>
          <span> {off}% Off </span>
          <span className="cart-product-price"> &#8377; {price} </span>
        </div>
        <div className="product-details-pricing">
          <div>
            MRP: <span className="product-details-mrp">&#8377; {mrp}</span>
          </div>
          <div>
            Our Deal:
            <span className="product-details-price"> &#8377; {price} </span>
          </div>
          <div className="product-details-savings-div">
            Savings:
            <span className="product-details-savings">
              &#8377; {savings} ({off}%)
            </span>
          </div>
        </div>

        <div className="cart-card-bottom">
          <div className="cart-card-qty-div">
            Quantity : <button onClick={decreaseQty} className="update-qty-btn"> - </button> {quantity}
            <button onClick={increaseQty} className="update-qty-btn"> + </button>
          </div>
          <div className="cart-bottom-btn">
            <button className="secondary-btn-1">Move to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};
