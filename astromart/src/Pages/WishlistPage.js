import React from 'react';
import {useEffect} from 'react';
import {useProducts} from "../Contexts/ProductContext";
import {WishlistCard} from "../Components/WishlistCard";
import {Empty} from "../Components/Empty"
import { useAuth } from '../Contexts/AuthContext';

export const WishlistPage = () => {

  const { wishlist } = useProducts();
  const { token } = useAuth();

  // useEffect(() => {
  //   ( async function () {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/products/wishlist",
  //         { headers: { authorization: token }}
  //       );
  //       // console.log(response.data);
  //       setUser(response.data);
  //     } catch (error) {
  //       if (error.response.status === 401) {
  //         // console.log("401");
  //         return navigate("/login");
  //       }
  //       setUser("error");
  //     }
  //   })();
  // }, [token]);

    return (
        <div>
          {
            wishlist.length > 0 ? wishlist.map( item => (
              <WishlistCard key={item._id} products={item} />
            ) ) : <Empty component={"Wishlist"} />
          }
        </div>
    )
}
