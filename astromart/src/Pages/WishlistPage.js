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
import { useFetchWishlist } from "../Hooks/useFetchWishlist";
import { ProductsCard } from "../Components/ProductsCard";
import {useMainContext} from "../Contexts/MainContext";
import {MyLoader} from "../Components/Loader"


export const WishlistPage = () => {
  // const { wishlist } = useProducts();
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useProducts();
  const {loader, products} = useMainContext();

  
  useFetchWishlist();

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

  console.log("Wishlist Page", wishlist)

  // console.log()


  return (
    <div className="wishlist-page">
    {/* { loader && <MyLoader />} */}
      {wishlist.map((item) => <ProductsCard product={item.product}/>)}
    </div>
  );
};







{/* ({ name, image, price, off, deluxe, category, rating, stock }) => (
          <div className="product-card">
            <div
              class="ribbon"
              style={!deluxe ? { display: "none" } : { display: "block" }}
            >
              <span>Deluxe</span>
            </div>
            <Link to={`/products/${_id}`}>
            <div
              className={`${
                stock ? "product-card-top" : "product-card-top-nostock"
              } `}
            >
              <img src={image} alt={name} />
              <span className="sold-text"> SOLD! </span>
            </div>
            </Link>
            <FavoriteIcon
              className="card-wishlist-btn"
              style={{ color: "#fb3958" }}
              onClick={() => dispatchProduct({type: "ADD_TO_WISHLIST", payload: products }) }
            />
            <div className="product-card-body">
              <div className="product-name"> {name} </div>
              <div className="product-card-details">
                <div>
                  <GradeRoundedIcon
                    style={
                      rating >= 4
                        ? { color: "var(--green-color)" }
                        : rating > 3 && rating < 4
                        ? { color: "var(--orange-color)" }
                        : { color: "var(--red-color)" }
                    }
                  />
                  {rating}
                </div>
                <div>
                  <span> {off}% Off </span>
                </div>
                <span className="product-price"> &#8377; {price} </span>
              </div>
              <div
                className="product-card-bottom"
                style={!stock ? { display: "none" } : { display: "null" }}
              >
                <button
                  className="primary-btn-1"
                  onClick={() =>
                    dispatchProduct({ type: "ADD_TO_CART", payload: products })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) */}