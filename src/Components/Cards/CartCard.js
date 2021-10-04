import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import axios from "axios";
import { useProducts } from "../../Contexts/ProductContext";
import { useAuth } from "../../Contexts/AuthContext";
import { toastFailText, toastSuccessText } from "../Toast";
import "./CartCard.Style.css";
import { Link, useNavigate } from "react-router-dom";

export const CartCard = ({ product }) => {
  const { _id, name, image, price, off, deluxe, category, rating, quantity } =
    product;
  const { loggedUser, token } = useAuth();
  const { dispatchProduct, wishlist } = useProducts();
  const navigate = useNavigate();
  const mrp = Math.round((price * 100) / (100 - off));
  const savings = Math.round(mrp - price);

  const increaseQty = async () => {
    try {
      const response = await axios.post(
        `https://astromart-backend.herokuapp.com/cart/${loggedUser._id}/${_id}`,
        {
          quantity: quantity + 1,
        },
        { headers: { authorization: token } }
      );

      dispatchProduct({ type: "INCREMENT_QTY", payload: product });
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQty = async () => {
    if (quantity === 1) {
      toastFailText("Item Removed from Cart!");
    }
    try {
      const response = await axios.post(
        `https://astromart-backend.herokuapp.com/cart/${loggedUser._id}/${_id}`,
        {
          quantity: quantity - 1,
        },
        { headers: { authorization: token } }
      );

      dispatchProduct({ type: "DECREMENT_QTY", payload: product });
    } catch (err) {
      console.log(err);
    }
  };

  const isWishlisted = () => wishlist?.some((item) => item._id === product._id);

  const wishlistHandler = async () => {
    if (isWishlisted()) {
      navigate("/wishlist");
    } else {
      try {
        const response = await axios.post(
          `https://astromart-backend.herokuapp.com/wishlist/${loggedUser._id}/${_id}`,
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
  };

  const removeFromCart = async () => {
    try {
      const response = await axios.post(
        `https://astromart-backend.herokuapp.com/cart/${loggedUser._id}/${_id}`,
        {
          userId: loggedUser._id,
          product: product._id,
          quantity: 0,
        },
        { headers: { authorization: token } }
      );
      dispatchProduct({ type: "REMOVE_FROM_CART", payload: product });
      toastSuccessText("Item Removed from Cart!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-img-div">
        <Link to={`/products/${_id}`}>
          <img src={image} alt={name} />
          <div
            className="ribbon"
            style={!deluxe ? { display: "none" } : { display: "block" }}
          >
            <span>Deluxe</span>
          </div>
        </Link>
      </div>
      <div className="cart-card-body">
        <h3 className="cart-details-heading"> {name} </h3>
        <div
          className="product-rating-div"
          style={
            rating >= 4
              ? { color: "var(--green-color)" }
              : rating > 3 && rating < 4
              ? { color: "var(--orange-color)" }
              : { color: "var(--red-color)" }
          }
        >
          <GradeRoundedIcon />
          <b className="product-rating-text">{rating}</b>
        </div>
        <div className="product-cart-category">Category : {category}</div>
        <div>
          MRP: <span className="product-details-mrp">&#8377; {mrp}</span>
        </div>
        <div>
          Our Deal:
          <span className="product-details-price"> &#8377; {price} </span>
        </div>
        <div className="product-details-savings-div">
          Savings:
          <span className="product-details-savings">
            &#8377; {savings} ({off}%)
          </span>
        </div>
        <div className="cart-card-bottom">
          <div className="cart-card-qty-div">
            Quantity :
            <button onClick={decreaseQty} className="update-qty-btn">
              -
            </button>
            {quantity}
            <button onClick={increaseQty} className="update-qty-btn">
              +
            </button>
          </div>
          <div className="cart-bottom-btn">
            <button onClick={wishlistHandler} className="primary-btn-1">
              {!isWishlisted() ? "Add to Wishlist" : "Go to Wishlist"}
            </button>
            <button onClick={removeFromCart} className="secondary-btn-1">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
