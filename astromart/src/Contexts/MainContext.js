import { createContext, useContext, useReducer } from "react";
import {initialHomeState} from "../Reducers/home";
import {homeReducer} from "../Reducers/homeReducer"

export const mainContext = createContext();

export function MainProvider({ children }) {
  const [state, dispatchMain] = useReducer(homeReducer, initialHomeState);

  return (
    <mainContext.Provider value={{ ...state, dispatchMain }}>
      {children}
    </mainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(mainContext);
}
