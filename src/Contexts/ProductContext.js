import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { initialProducts } from "../Reducers/product";
import { productReducer } from "../Reducers/productReducer";

export const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const { token, loggedUser } = useAuth();
  const [state, dispatchProduct] = useReducer(productReducer, initialProducts);

  async function fetchProducts() {
    dispatchProduct({ type: "SET_LOADER" });
    try {
      const {
        status,
        data: { success, products },
      } = await axios.get("https://astromart-backend.herokuapp.com/products");

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
    if (state.products.length === 0) {
      fetchProducts();
    }
  }, []);

  async function fetchWishlist() {
    try {
      const { data } = await axios.get(
        `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}`,
        { headers: { authorization: token } }
      );

      dispatchProduct({
        type: "FETCH_WISHLIST",
        payload: { wishlist: data.wishlist },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, [token, loggedUser]);

  async function fetchCart() {
    try {
      const { data } = await axios.get(
        `https://astromart-backend.herokuapp.com/cart/${loggedUser._id}`,
        { headers: { authorization: token } }
      );

      dispatchProduct({ type: "FETCH_CART", payload: { cart: data.cart } });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [token, loggedUser]);

  return (
    <ProductContext.Provider value={{ ...state, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
