import React from 'react';
import {useProducts} from "../Contexts/ProductContext";
import "../App.css";
import { useMainContext } from '../Contexts/MainContext';
import {WishlistCard} from "../Components/WishlistCard";
import {Empty} from "../Components/Empty";
import { ProductsCard } from "../Components/ProductsCard";

export const CartPage = () => {
    const { cart } = useProducts();
    const {loader} = useMainContext();
    const cartItems = cart;

    console.log(cart);

    return (
        <div className="products-container">
            { cart.length ?
                cartItems.map(item => {
                    <ProductsCard key={item._id} products={item} />
                }) : <Empty />
            }
        </div>
    )
}

