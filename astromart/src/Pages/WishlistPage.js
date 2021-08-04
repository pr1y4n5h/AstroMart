import { useProducts } from "../Contexts/ProductContext";
import { Empty } from "../Components/Empty";
import { useAuth } from "../Contexts/AuthContext";
import "../App.css";
import { ProductsCard } from "../Components/ProductsCard";
import {MyLoader} from "../Components/Loader";
import {usePageTitle} from "../Hooks/usePageTitle";

export const WishlistPage = () => {
  const { token } = useAuth();
  const { wishlist, dispatchProduct } = useProducts();

  usePageTitle("AstroMart || My Wishlist")

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

  return (
    <div className="wishlist-page">
    {/* { loader && <MyLoader />} */}
      {wishlist.length > 0 ? wishlist.map((item) => <ProductsCard product={item}/>) : <Empty component="Wishlist" /> }
    </div>
  );
};

