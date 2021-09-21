export function productReducer(state, action) {
  switch (action.type) {
    case "SET_LOADER":
      return { ...state, loader: !state.loader };

    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };

    case "FETCH_WISHLIST":
      return {
        ...state,
        wishlist: action.payload.wishlist.map((item) => item.product),
      };

    case "FETCH_CART":
      return {
        ...state,
        cart: action.payload.cart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })),
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        cartTotal: state.cartTotal + action.payload.price,
      };

    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        cartTotal: state.cartTotal + action.payload.price,
      };

    case "DECREMENT_QTY":
      return {
        ...state,
        cart:
          action.payload.quantity > 1
            ? state.cart.map((item) =>
                item._id === action.payload._id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            : state.cart.filter((item) => item._id !== action.payload._id),
        cartTotal: state.cartTotal - action.payload.price,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };

    case "FLUSH_CART":
      return {
        ...state,
        cart: [],
        cartTotal: 0,
      };

    case "FLUSH_WISHLIST":
      return {
        ...state,
        wishlist: [],
      };

    default:
      return state;
  }
}
