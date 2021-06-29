import { createContext, useContext, useReducer } from "react";

export const mainContext = createContext();

const initialState = {
  sortBy: null,
  filteredData: [],
  showProducts: true
};

function mainReducer(state, action) {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_STOCK":
        return {
            ...state,
            showProducts: !state.showProducts
        }
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
