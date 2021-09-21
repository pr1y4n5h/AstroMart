import { useParams } from "react-router-dom";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import "./ProductDetails.style.css";
import { useProducts } from "../../Contexts/ProductContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import axios from "axios";
import { toastSuccessText, toastFailText } from "../../Components/Toast";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
  useScrollToTop();

  const { cart, products, wishlist, dispatchProduct } = useProducts();
  const { productID } = useParams();
  const navigate = useNavigate();
  const { token, loggedUser } = useAuth();
  const product = products?.find((product) => product._id === productID);
  const isInCart = cart?.find((item) => item._id === productID);
  const mrp = Math.round((product?.price * 100) / (100 - product?.off));
  const savings = Math.round(mrp - product?.price);

  const cartHandler = async () => {
    if (token) {
      if (isInCart) {
        navigate("/cart");
      } else {
        try {
          await axios.post("https://astromart-backend.herokuapp.com/cart/", {
            userId: loggedUser._id,
            product: product._id,
            quantity: 1,
          },  { headers: { authorization: token } });
          dispatchProduct({ type: "ADD_TO_CART", payload: product });
          toastSuccessText("Item Added to Cart!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toastFailText("Please login to continue!");
    }
  };

  const isWishlisted = () => wishlist?.some((item) => item._id === productID);

  const wishlistHandler = async () => {
    if (token) {
      if (isWishlisted()) {
        try {
          await axios.post(
            `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}/${productID}`,
            {
              type: "REMOVE",
            },
            { headers: { authorization: token } }
          );
          dispatchProduct({ type: "REMOVE_FROM_WISHLIST", payload: product });
          toastFailText("Item removed from Wishlist!");
          console.log(wishlist);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(
            `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}/${productID}`,
            {
              type: "ADD",
            },
            { headers: { authorization: token } }
          );
          dispatchProduct({ type: "ADD_TO_WISHLIST", payload: product });
          toastSuccessText("Item added to Wishlist!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toastFailText("Please login to continue!");
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product?.image} alt={product?.name} />
        <div
          className="ribbon"
          style={!product?.deluxe ? { display: "none" } : { display: "block" }}
        >
          <span>Deluxe</span>
        </div>
      </div>

      <div className="product-details-content">
        <h2 className="product-details-heading"> {product?.name} </h2>
        <div
          className="product-rating-div"
          style={
            product?.rating >= 4
              ? { color: "var(--green-color)" }
              : product?.rating > 3 && product?.rating < 4
              ? { color: "var(--orange-color)" }
              : { color: "var(--red-color)" }
          }
        >
          <GradeRoundedIcon />
          <b className="product-rating-text">{product?.rating}</b>
        </div>
        <small> Category : {product?.category}</small>
        <p className="product-details-description"> {product?.details} </p>

        <div className="product-details-pricing">
          <div>
            MRP: <span className="product-details-mrp">&#8377; {mrp}</span>
          </div>
          <div className="our-deal">
            Our Deal:
            <span className="product-details-price">
              &#8377; {product?.price}
            </span>
          </div>
          <div className="product-details-savings-div">
            Savings:
            <span className="product-details-savings">
              &#8377; {savings} ({product?.off}%)
            </span>
          </div>
        </div>

        <div className="product-details-buttons">
          <button
            onClick={cartHandler}
            style={!product?.stock ? { display: "none" } : null}
            className="primary-btn-1"
          >
            {isInCart && token ? "Go to Cart" : "Add to Cart"}
          </button>
          <button className="secondary-btn-1" onClick={wishlistHandler}>
            {isWishlisted() && token
              ? "Remove from Wishlist"
              : "Move to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};
