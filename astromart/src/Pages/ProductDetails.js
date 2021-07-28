import React from "react";
import { useParams } from "react-router-dom";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import "../App.css";
import {useMainContext} from "../Contexts/MainContext"
import {useScrollToTop} from "../Hooks/useScrollToTop"

export const ProductDetails = () => {

  useScrollToTop(); 

  const { products } = useMainContext();
  const { productID } = useParams();

  const { name, image, price, off, rating, details, category, deluxe } =
    products.find((product) => product._id === productID);

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
      <button className="primary-btn-1"> Add to Cart </button> 
      <button className="secondary-btn-1"> Move to Wishlist </button> 
      </div>
    </div>
    </div>
  );
};
