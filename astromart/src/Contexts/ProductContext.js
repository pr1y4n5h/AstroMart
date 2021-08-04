import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const ProductContext = createContext();

const initialState = {
  products: [],
  loader: false,
  wishlist: [],
  cart: [],
  cartTotal: 0
};

function productReducer(state, action) {
  switch (action.type) {

    case "SET_LOADER":
      return { ...state, loader: !state.loader };

    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };

    case "FETCH_WISHLIST":
      return {
        ...state,
        wishlist: action.payload.wishlist.map(item => item.product),
      };

      case "FETCH_CART":
      return {
        ...state,
        cart: action.payload.cart.map(item=> ({...item.product, quantity: item.quantity}))
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload._id),
      };

      case "ADD_TO_CART": 
      return {
        ...state,
        cart: [...state.cart, {...action.payload, quantity: 1}],
        cartTotal: state.cartTotal + action.payload.price
      }

      case "INCREMENT_QTY": 
      return {
        ...state,
        cart: state.cart.map(item => item._id === action.payload._id ? {...item, quantity: item.quantity + 1} : item ),
        cartTotal: state.cartTotal + action.payload.price
      }

      case "DECREMENT_QTY":
        return {
          ...state,
          cart: action.payload.quantity > 1 ? state.cart.map(item => item._id === action.payload._id ? {...item, quantity: item.quantity - 1} : item ) : state.cart.filter(item => item._id !== action.payload._id ),
          cartTotal: state.cartTotal - action.payload.price
        }

    default:
      return state;
  }
}




export function ProductProvider({ children }) {

  const { token, loggedUser } = useAuth();

  const [state, dispatchProduct] = useReducer(productReducer, initialState);

  //  const fetchWishlist = async () => {

  //   const fetchWishlistURL = isUserLogin && `http://localhost:5000/wishlist/${loggedUser._id}`

  //   try { 
  //     dispatchProduct({ type: "SET_LOADER" });
  //     const {
  //       status,
  //       data: { success, wishlist },
  //     } = await axios.get(fetchWishlistURL);

  //     if (status === 200) {
  //       dispatchProduct({ type: "FETCH_WISHLIST", payload: wishlist });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     dispatchProduct({ type: "SET_LOADER" });
  //   }
  // }

  // useEffect(() => {
  //   if (state.wishlist.length === 0) {
  //     token && fetchWishlist();
  //   }
  // }, [loggedUser, token]);

  





  // Working
  async function fetchWishlist() {

    try {
      const { data } = await axios.get(`http://localhost:5000/wishlist/${loggedUser._id}`, { headers: { authorization: token }});
      
      dispatchProduct({ type: "FETCH_WISHLIST", payload: { wishlist: data.wishlist}})
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [token, loggedUser]);


  async function fetchCart() {

  try {
       const {data} = await axios.get(`http://localhost:5000/cart/${loggedUser._id}`);

      dispatchProduct({ type: "FETCH_CART", payload: {cart: data.cart}})
     } catch (error) {
       console.log(error)
     }
   }

   useEffect(() => {
     fetchCart()
   }, [token])

  return (
    <ProductContext.Provider value={{ ...state, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
