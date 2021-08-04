export function homeReducer(state, action) {
    switch (action.type) {
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
  
      default:
        return state;
    }
  }