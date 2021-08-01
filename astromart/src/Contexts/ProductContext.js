import { createContext, useContext, useReducer } from "react";
import {useFetchWishlist} from "../Hooks/useFetchWishlist";

export const ProductContext = createContext();

const initialState = {
  wishlist: [],
  cart: [],
};

function productReducer(state, action) {
  switch (action.type) {
    case "FETCH_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload)
      };

      case "FLUSH_WISHLIST":
        return {
          wishlist: ""
        }

    // case "FETCH_CART":
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };

    // case "ADD_TO_cart":
    //   return {
    //     ...state,
    //     cart: [...state.cart, action.payload],
    //   };

    // case "INCREMENT_QTY":
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };

    // case "DECREMENT_QTY":
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };

    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatchProduct] = useReducer(productReducer, initialState);

  // useFetchWishlist();

  return (
    <ProductContext.Provider value={{ ...state, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
