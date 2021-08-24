import { useProducts } from "../../Contexts/ProductContext";
import { Empty } from "../../Components/Empty/Empty";
import { useAuth } from "../../Contexts/AuthContext";
import "./WishlistPage.style.css";
import { ProductsCard } from "../../Components/Cards/ProductsCard";
import {MyLoader} from "../../Components/Loader/Loader";
import {usePageTitle} from "../../Hooks/usePageTitle";

export const WishlistPage = () => {
  const { token } = useAuth();
  const { wishlist, dispatchProduct } = useProducts();

  usePageTitle("AstroMart || My Wishlist")

  return (
    <div className="wishlist-page">
    {/* { loader && <MyLoader />} */}
      {wishlist.length > 0 ? wishlist.map((item) => <ProductsCard product={item}/>) : <Empty component="Wishlist" /> }
    </div>
  );
};

