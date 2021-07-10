import React from "react";
import { Sidebar } from "../Components/Sidebar";
import { useMainContext } from "../Contexts/MainContext";
import { ProductsCard } from "../Components/ProductsCard";
import "../App.css";
import {useFetchProducts} from "../Hooks/useFetchProducts";
import {MyLoader} from "../Components/Loader"

export const ProductsPage = () => {
  const { sortBy, showProducts, products, loader } = useMainContext();

  useFetchProducts();

  function getSorted(products, sortBy) {
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return products.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return products.sort((a, b) => b["price"] - a["price"]);
    }
    return products;
  }

  function getFiltered(products, { showProducts }) {
    return products.filter(({ stock }) => (showProducts ? true : stock));
  }

  const sorted = getSorted(products, sortBy);
  const filtered = getFiltered(sorted, { showProducts });

  return (
    <div className="product-page">
      <Sidebar />
      <div className="products-container">
      { loader && <MyLoader />}
        {filtered.map((item) => (
          <ProductsCard key={item._id} products={item} />
        ))}
      </div>
    </div>
  );
};
