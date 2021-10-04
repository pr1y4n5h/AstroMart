import "./Summary.style.css";
import StripeCheckout from "react-stripe-checkout";
import { toastSuccessText } from "../Toast";
import { useProducts } from "../../Contexts/ProductContext";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";

export const CartSummary = () => {
  const { dispatchProduct, cart } = useProducts();
  const { loggedUser, token } = useAuth();
  const initialCartValue = cart.map((item) => item.price * item.quantity);
  const netInitialCartTotal = initialCartValue.reduce((acc, val) => acc + val);

  const netTotal =
    netInitialCartTotal < 799 ? netInitialCartTotal + 40 : netInitialCartTotal;
  const stripePrice = netTotal * 100;
  const publishableKey = process.env.REACT_APP_STRIPE_KEY;

  const cartCheckOut = async () => {
    try {
      await axios.post(
        "https://astromart-backend.herokuapp.com/cart/checkout",
        {
          userId: loggedUser._id,
        },
        { headers: { authorization: token } }
      );
      toastSuccessText("Order has been placed successfully! 🔥");
      dispatchProduct({ type: "FLUSH_CART" });
    } catch (err) {
      console.log(err);
    }
  };

  const onToken = (token) => {
    console.log(token);
    cartCheckOut();
  };

  return (
    <>
      <aside className="cart-summary-aside">
        <h1 className="cart-summary-heading">Cart Summary </h1>

        <div className="cart-summary-calc">
          <h3> Your total : &#8377; {netInitialCartTotal} </h3>
          <h3 className="cart-shipping">
            <span className="cart-shipping-hdn">Shipping Charges :</span>
            <span
              style={
                netInitialCartTotal > 799
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            >
              &#8377;
            </span>
            {netInitialCartTotal < 799 ? " 40" : "Free"}
          </h3>
          <p>
            Free delivery for orders above <b> &#8377; 799 </b>
          </p>
          <hr style={{ marginTop: "3rem" }} />
        </div>

        <h2 className="cart-net-total">Amount Payable : &#8377; {netTotal}</h2>
        <div className="checkout-btn">
          <StripeCheckout
            label="Check out"
            panelLabel="Pay"
            currency="INR"
            email={loggedUser?.email}
            name={loggedUser?.name}
            shippingAddress
            description={`Your total is INR ${netTotal}`}
            amount={stripePrice}
            image="https://wallpapercave.com/wp/wp4053198.jpg"
            stripeKey={publishableKey}
            token={onToken}
          >
            <button className="primary-btn-1"> Check Out </button>
          </StripeCheckout>
        </div>
      </aside>
    </>
  );
};
