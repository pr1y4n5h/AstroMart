import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../Contexts/ProductContext";

export function useFetchProducts() {

  const { dispatchProduct, products } = useProducts();

  async function fetchProducts() {
    
    dispatchProduct({ type: "SET_LOADER" });

    try {
      const {
        status,
        data: { success, products },
      } = await axios.get(
        "https://astromart-backend.herokuapp.com/products"
      );

      if (success === true && status === 200) {
        dispatchProduct({ type: "FETCH_PRODUCTS", payload: products });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatchProduct({ type: "SET_LOADER" });
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);
}
