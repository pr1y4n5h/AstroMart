import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

const products = [
    
    {
      id: 2,
      name: "Relativity",
      url: "https://images-na.ssl-images-amazon.com/images/I/813ExjDkhxS.jpg",
      desc: "The Special and the General Theory",
      author: "Albert Einstein",
      mrp: 199,
      off: 35,
      price: 129
    },

    {
        _id: "nasa-hoodie", 
        name: "NASA Grey Sweatshirt",
        url: "https://images-na.ssl-images-amazon.com/images/I/61Dgw5pj3GL._AC_UX569_.jpg", 
        category: "clothes",
        price: 699 ,
        discount: 30,
        description: "Love science and everything that has to do with outer space? Get this cute and trendy 'NASA' logo sweatshirt to show how nerdy and cool you are. Great for anyone who wants to be an astronaut or wishes they were one! Also makes a great gift!"
    }
  ];



export const ProductsPage = () => {
    return (
        <div className="products-container">
            {
                products.map(item => (
                    <div className="product-card" >
                    <div className="product-card-top">
                    <img src={item.url} alt={item.name} />
                    <FavoriteIcon className="card-wishlist-btn" style={{color: "#fb3958"}} />
                    </div>
                    <div className="product-card-body" >
                    <div className="product-card-name"> {item.name} </div>
                    <div className="product-card-details">
                    <span> INR {item.price} </span> <span> {item.off} </span> </div>
                    <button className="primary-btn-1"> Add to Cart </button>
                    </div>
                    </div>
                ) )
            }
        </div>
    )
}

