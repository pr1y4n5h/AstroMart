import React from "react";
import { useProducts } from "../Contexts/ProductContext";
import "../App.css";
import { Empty } from "../Components/Empty";
import { products } from "../data";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../Hooks/useScrollToTop";
import {usePageTitle} from "../Hooks/usePageTitle";
import {CartCard} from "../Components/CartCard/CartCard"
import {CartSummary} from "../Components/CartSummary";
import axios from "axios";
 
export const CartPage = () => {

  useScrollToTop();
  usePageTitle("AstroMart || My Cart")

  const { cart, dispatchProduct } = useProducts();

  const {off, price} = products;

  const mrp = Math.round((price*100)/(100-off));
  const savings = Math.round(mrp - price);


  return ( 
    <div>
    {cart.length > 0 ? <div className="cart-box">
      <div className="cart-products-div">
        {cart.map(item => (
          <CartCard product={item} />
        ))}
      </div>
      <CartSummary />
    </div> : <Empty component="Cart" />}
    </div>
  );
};
