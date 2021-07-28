import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../Contexts/ProductContext";

export function useFetchWishlist() {
  const { dispatchProduct, wishlist } = useProducts();
 
  async function fetchWishlist() {
    try {
      const { status, data } = await axios.get(
        "http://localhost:5000/wishlist/"
      );

      if (success === true && data.status === 200) {
        dispatchProduct({ type: "ADD_TO_WISHLIST", payload: products });
        console.log(products);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (wishlist.length === 0) {
      fetchWishlist();
    }
  }, []);
}
