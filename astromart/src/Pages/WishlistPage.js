import React from 'react'
import {useWishlist} from "../Contexts/WishlistContext";
import {WishlistCard} from "../Components/WishlistCard";
import {Empty} from "../Components/Empty"

export const WishlistPage = () => {

  const {wishlist} = useWishlist()

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
