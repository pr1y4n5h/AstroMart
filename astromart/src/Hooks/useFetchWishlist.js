import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../Contexts/ProductContext";
import { useAuth } from "../Contexts/AuthContext";
import { useMainContext } from "../Contexts/MainContext";

export function useFetchWishlist() {
  const { dispatchProduct, wishlist } = useProducts();
  const { isUserLogin, loggedUserInfo } = useAuth();
  const {dispatchMain} = useMainContext();

  async function fetchWishlist() {

    const fetchWishlistURL = isUserLogin ? `http://localhost:5000/wishlist/${loggedUserInfo._id}` : "http://localhost:5000/wishlist/"
    
      try {
        dispatchMain({type: "SET_LOADER"})
        const {
          status,
          data: { success, wishlist },
        } = await axios.get(fetchWishlistURL);

        if (status === 200) {
          dispatchProduct({ type: "FETCH_WISHLIST", payload: wishlist });
        }
      } catch (err) {
        console.log(err);
      }
      finally {
        dispatchMain({type: "SET_LOADER"})
      }
  }

  useEffect(() => {
    if (wishlist.length === 0) {
      fetchWishlist();
    }
  }, []);
}
