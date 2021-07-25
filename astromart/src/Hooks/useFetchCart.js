import axios from "axios";
import { useEffect } from "react";
import { useMainContext } from "../Contexts/MainContext";

export function useFetchProducts() {
  const { dispatchMain, products } = useMainContext();

  async function fetchProducts() {
    dispatchMain({ type: "SET_LOADER" });

    try {
      const {
        status,
        data: { success, products },
      } = await axios.get(
        "http://localhost:5000/products"
      );

      if (success === true && status === 200) {
        dispatchMain({ type: "FETCH_PRODUCTS", payload: products });
        console.log(products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatchMain({ type: "SET_LOADER" });
    }
  }

  useEffect(() => {
      
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);
}
