import React from "react";
import { createContext, useContext, useReducer} from "react";

export const WishlistContext = createContext();

const initialState = {
    wishlist: [],
    // wishlistId: null
}

function wishlistReducer(state,action) {

    switch(action.type) {
        case "ADD_TO_WISHLIST":
        return {
            ...state,
            wishlist: action.payload
        }

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item._id !== action.payload )
            }


        default:
            return state;
    }

}

export function WishlistProvider({children}) {

    const [state, dispatchWishlist] = useReducer(wishlistReducer, initialState )

    return (
        <WishlistContext.Provider value={{...state, dispatchWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    return useContext(WishlistContext);
}