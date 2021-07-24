import {createContext, useContext, useReducer} from "react";

export const ProductContext = createContext();


const initialState = {
    wishlist: [],
    cart: [],
    cartId: null,
    wishlistId: null 
  }

function productReducer(state, action) {
    switch (action.type) {
        
      case "ADD_TO_CART":
        return {
          ...state,
          cart: action.payload
        };
  
    //   case "REMOVE_FROM_WISHLIST":
    //     return {
    //       ...state,
    //       wishlist: state.wishlist.filter((item) => item._id !== action.payload),
    //     };
        
    //   case "TOGGLE_CART":
    //       return {
    //           ...state,
    //           inCart: !state.inCart
    //       } 
  
      default:
        return state;
    }
  }
  

export function ProductProvider({children}) {

    const [state, dispatchProduct] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ ...state, dispatchProduct }}>
            {children}
        </ProductContext.Provider>
    )
}


export function useProducts() {
    return useContext(ProductContext);
}