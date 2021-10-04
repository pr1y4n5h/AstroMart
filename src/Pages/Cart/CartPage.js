import { useProducts } from "../../Contexts/ProductContext";
import "./CartPage.styles.css";
import { Empty } from "../../Components/Empty/Empty";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import {usePageTitle} from "../../Hooks/usePageTitle";
import {CartCard} from "../../Components/Cards/CartCard"
import {CartSummary} from "../../Components/Summary/CartSummary";
import { useAuth } from "../../Contexts/AuthContext";
 
export const CartPage = () => {

  useScrollToTop();
  usePageTitle("AstroMart || My Cart") 
  const { loggedUser } = useAuth();
  const { cart } = useProducts();

  return ( 
    <>
      <h2 className="wishlist-cart-heading"> {loggedUser?.username?.charAt().toUpperCase() + loggedUser?.username.slice(1)}'s Cart </h2>
    {cart.length > 0 ? <div className="cart-box"> 
      <div className="cart-products-div">
        {cart.map(item => (
          <CartCard product={item} key={item._id} />
        ))}
      </div>
      <CartSummary />
    </div> : <Empty component="Cart" />}
    </>
  );
};
