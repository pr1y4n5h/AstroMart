import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useState} from "react";
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import {products} from "../data";
import {Sidebar} from "../Components/Sidebar"

export const ProductsPage = () => {

    const [state, setState] = useState(false)
    return (
        <div className="product-page">
        <Sidebar />
        <div className="products-container">
            {
                products.map(({id, name, image, category, price, off, rating} , ind ) => (
                    <div key={id} className="product-card" style={ ind%2 === 0 ? {backgroundColor: "#f1f2f6"} : {backgroundColor: "var(--base-color)"} } >
                    <div className="product-card-top">
                    <img src={image} alt={name} />
                    <FavoriteIcon onClick={() => setState(state => !state)} className="card-wishlist-btn" style={ state ? {color: "#fb3958"} : {color: "white"} } />
                    </div>

                    <div className="product-card-body" >
                    <div className="product-name"> {name} </div>
                    <div className="product-card-details">
                    <div> <GradeRoundedIcon style={ rating >= 4 ? {color: "var(--green-color)"} : (rating > 3 && rating < 4) ? {color: "var(--orange-color)"} : {color: "var(--red-color)"} } /> {rating} </div>
                    <div> <span> {off}% Off </span> </div>
                    <span className="product-price" > &#8377; {price} </span>
                    </div>
                    <div className="product-card-bottom"> 
                    <button className="primary-btn-1"> Add to Cart </button>
                     
                    </div>
                    </div>
                    </div>
                ) )
            }
        </div>
        </div>
    )
    
}

