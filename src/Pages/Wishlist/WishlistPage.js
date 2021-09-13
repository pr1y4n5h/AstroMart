import { useProducts } from "../../Contexts/ProductContext";
import { Empty } from "../../Components/Empty/Empty";
import { useAuth } from "../../Contexts/AuthContext";
import "./WishlistPage.style.css";
import { ProductsCard } from "../../Components/Cards/ProductsCard";
import { usePageTitle } from "../../Hooks/usePageTitle";

export const WishlistPage = () => {
  const { loggedUser } = useAuth();
  const { wishlist} = useProducts();

  usePageTitle("AstroMart || My Wishlist");

  return (
    <>
      <h2 className="wishlist-cart-heading"> {loggedUser?.username?.charAt().toUpperCase() + loggedUser?.username.slice(1)}'s Wishlist </h2>
      <div className="wishlist-page">
        {wishlist.length > 0 ? (
          wishlist.map((item) => <ProductsCard product={item} />)
        ) : (
          <Empty component="Wishlist" />
        )}
      </div>
    </>
  );
};
