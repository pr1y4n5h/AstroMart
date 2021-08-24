import React from "react";
import { useProducts } from "../../Contexts/ProductContext";
import "./CartPage.styles.css";
import { Empty } from "../../Components/Empty/Empty";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import {usePageTitle} from "../../Hooks/usePageTitle";
import {CartCard} from "../../Components/Cards/CartCard"
import {CartSummary} from "../../Components/Summary/CartSummary";
 
export const CartPage = () => {

  useScrollToTop();
  usePageTitle("AstroMart || My Cart") 

  const { cart } = useProducts();

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
