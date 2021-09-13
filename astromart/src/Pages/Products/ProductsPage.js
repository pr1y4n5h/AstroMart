import React, { useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { useMainContext } from "../../Contexts/MainContext";
import { ProductsCard } from "../../Components/Cards/ProductsCard";
import "./ProductsPage.style.css";
import {MyLoader} from "../../Components/Loader/Loader";
import {useScrollToTop} from "../../Hooks/useScrollToTop"; 
import {useProducts} from "../../Contexts/ProductContext"
import {usePageTitle} from "../../Hooks/usePageTitle";

export const ProductsPage = () => {
  const { sortBy, showProducts, showDeluxe, showClothing, showBooks, showGadgets, showOthers, showJewellery } = useMainContext();
  const {products, wishlist, loader } = useProducts();
  usePageTitle("AstroMart || Products")
  useScrollToTop();

  // console.log(wishlist);

  function getSorted(products, sortBy) {
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return products.sort((a, b) => a["price"] - b["price"]); 
    }
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return products.sort((a, b) => b["price"] - a["price"]);
    }
    return products;
  }

  function getFiltered(products, { showProducts, showDeluxe, showClothing, showBooks, showGadgets, showOthers, showJewellery }) {
    return products
    .filter(({ stock }) => (showProducts ? true : stock))
    .filter(({deluxe}) => (showDeluxe ? deluxe : true))
    .filter(({category}) => (showClothing ? category==="clothing" : showBooks ? category==="books" : showGadgets ? category==="gadgets" : category))
    .filter(({category}) => (showBooks ? category==="books" : category) )
    .filter(({category}) => (showGadgets ? category==="gadgets" : true) )
    .filter(({category}) => (showJewellery ? category==="jewellery" : true) )
    .filter(({category}) => (showOthers ? category==="others" : true) )
  }

  const sorted = getSorted(products, sortBy);
  const filtered = getFiltered(sorted, { showProducts, showDeluxe, showClothing, showBooks, showGadgets, showOthers, showJewellery });

  return (
    <div className="product-page">
      <Sidebar />
      <div className="products-container">
      { loader && <MyLoader />}
        {filtered.map((item) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};
