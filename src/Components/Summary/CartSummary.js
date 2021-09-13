import { useProducts } from "../../Contexts/ProductContext";
import "./Summary.style.css"

export const CartSummary = () => {
  const { cartTotal } = useProducts();

  return (
    <>
      <aside className="cart-summary-aside">  
      <h1 className="cart-summary-heading">Cart Summary </h1>
      <div className="cart-summary-calc">
          <h3 className="cart-total"> Your total: &#8377; {cartTotal} </h3>
          <h3 className="cart-shipping"> Shipping Charges: &#8377; 40 </h3>
          <hr style={{ marginTop: "3rem"}} />
          </div>
          <h2 className="cart-net-total"> Amount Payable : &#8377; {cartTotal + 40} </h2>
          <button className="primary-btn-1"> Check Out </button>
      </aside>
    </>
  );
};
