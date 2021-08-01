import axios from "axios";
import { toastSuccessText, toastFailText } from "../Components/Toast";
import { useProducts } from "../Contexts/ProductContext";

export async function addToWishlist(userID, productID) {
  try {
    const { data, status } = await axios.post(
      `http://localhost:5000/wishlist/${userID}/${productID}`,
      {
        type: "ADD",
      }
    );

    if (status === 200 && data.success === true) {
      toastSuccessText("Added");
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromWishlist(userID, productID) {
  try {
    const { data, status } = await axios.post(
      `http://localhost:5000/wishlist/${userID}/${productID}`,
      {
        type: "REMOVE",
      }
    );

    if (status === 200 && data.success === true) {
      toastFailText("Removed from Wishlist");
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
