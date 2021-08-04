import React, { useEffect } from "react";
import { useProducts } from "../Contexts/ProductContext";
import { Empty } from "../Components/Empty";
import { useAuth } from "../Contexts/AuthContext";
import { products } from "../data";
import "../App.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsCard } from "../Components/ProductsCard";
import {MyLoader} from "../Components/Loader";
import {usePageTitle} from "../Hooks/usePageTitle";



export const WishlistPage = () => {
  // const { wishlist } = useProducts();
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { wishlist, dispatchProduct } = useProducts();

  usePageTitle("AstroMart || My Wishlist")
  // useFetchWishlist();

  // console.log(wishlist);
  // console.log(wishlist.map(item=> item.product.map(value => console.log(value))));

  // useEffect(() => {
  //   ( async function () {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/products/wishlist",
  //         { headers: { authorization: token }}
  //       );
  //       // console.log(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       if (error.response.status === 401) {
  //         // console.log("401");
  //         return navigate("/login");
  //       }
  //     }
  //   })();
  // }, [token]);



  console.log({token})

  // console.log()

  return (
    <div className="wishlist-page">
    {/* { loader && <MyLoader />} */}
      {wishlist.length > 0 ? wishlist.map((item) => <ProductsCard product={item}/>) : <Empty component="Wishlist" /> }
    </div>
  );
};

