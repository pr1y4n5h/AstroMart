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

    default:
      return state;
  }
}
