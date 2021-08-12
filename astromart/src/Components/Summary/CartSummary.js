import React from "react";
import { useProducts } from "../../Contexts/ProductContext";
import "./Summary.style.css"

export const CartSummary = () => {
  const { cartTotal } = useProducts();

  return (
    <>
      <aside className="cart-summary-aside">  
      <div className="cart-summary-heading"> <h2>Cart Summary </h2> </div>
      <div className="cart-summary-calc">
          <p> Your Sum: {cartTotal} </p>
          <p> Shipping Charges: 40 </p>
          <hr />
          </div>
          <p> Amount Payable : {cartTotal + 40} </p>
          <button className="primary-btn-1"> Check Out </button>
      </aside>
    </>
  );
};
