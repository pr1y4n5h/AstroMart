import React from "react";
import { useProducts } from "../Contexts/ProductContext";
import "../App.css";
import { useMainContext } from "../Contexts/MainContext";
import { Empty } from "../Components/Empty";
import { products } from "../data";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../Hooks/useScrollToTop";
 
export const CartPage = () => {
  useScrollToTop();
  const { cart } = useProducts();
  const { loader } = useMainContext();

  const {off, price} = products;

  const mrp = Math.round((price*100)/(100-off));
  const savings = Math.round(mrp - price);

  return ( 
    <div className="cart-page">
      {/* { cart.length ?
                cartItems.map(item => {
                    <ProductsCard key={item._id} products={item} />
                }) : <Empty />
            } */}

      <div className="cart-products-div">
        {products.map(({ _id, name, image, price, off, deluxe, category, rating, stock }) => (
          <div className="cart-card">
            <div className="cart-img-div">
              <img src={image} alt={name} />
        <div class="ribbon" style={!deluxe ? {display:"none"} : {display:"block"}} ><span>Deluxe</span></div>

            </div>
            <div className="cart-card-body">
            <div className="cart-details-heading"> <h2> {name} </h2> </div>
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
              <div>
               Category : {category}
              </div>
              <span> {off}% Off </span>
              <span className="cart-product-price"> &#8377; {price} </span>
            </div>
            <div className="product-details-pricing"> 
        <div> MRP: <span className="product-details-mrp"> &#8377; {mrp} </span> </div>
        <div> Our Deal: <span className="product-details-price" > &#8377; {price}   </span></div>
        <div className="product-details-savings-div"> Savings: <span className="product-details-savings"> &#8377; {savings} ({off}%) </span> </div>
      </div>

            <div
              className="cart-card-bottom"
            >
              <div className="cart-card-qty-div"> Quantity : <button className="update-qty-btn" > - </button> 1 <button className="update-qty-btn" > + </button> </div>
              
              <div className="cart-bottom-btn"> 
              <button
                className="secondary-btn-1"
              >
                Move to Wishlist
              </button>
              </div>
            </div>

          </div>
          </div>
        ))}
      </div>

      <aside className="cart-summary-aside">
        <div className="cart-summary-heading">
          <h2>Your Cart</h2>

        </div>
      </aside>
    </div>
  );
};
