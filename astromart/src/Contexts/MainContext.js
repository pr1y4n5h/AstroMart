import { createContext, useContext, useReducer } from "react";

export const mainContext = createContext();

const initialState = {
  sortBy: null,
  filteredData: [],
  showProducts: true,
  showDeluxe: false,
  showClothing: false,
  showBooks: false,
  showGadgets: false,
  showJewellery: false,
  showOthers: false,
  products: [],
  loader: false,
};

function mainReducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };

    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_STOCK":
      return {
        ...state,
        showProducts: !state.showProducts,
      };

    case "TOGGLE_DELUXE":
      return {
        ...state,
        showDeluxe: !state.showDeluxe,
      };

    case "TOGGLE_CLOTHING":
      return {
        ...state,
        showClothing: !state.showClothing,
      };

    case "TOGGLE_BOOKS":
      return {
        ...state,
        showBooks: !state.showBooks,
      };

    case "TOGGLE_GADGETS":
      return {
        ...state,
        showGadgets: !state.showGadgets,
      };

    case "TOGGLE_JEWELLERY":
      return {
        ...state,
        showJewellery: !state.showJewellery,
      };

    case "TOGGLE_OTHERS":
      return {
        ...state,
        showOthers: !state.showOthers,
      };
 
    case "SET_LOADER":
      return { ...state, loader: !state.loader };

    default:
      return state;
  }
}

export function MainProvider({ children }) {
  const [state, dispatchMain] = useReducer(mainReducer, initialState);

  return (
    <mainContext.Provider value={{ ...state, dispatchMain }}>
      {children}
    </mainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(mainContext);
}
