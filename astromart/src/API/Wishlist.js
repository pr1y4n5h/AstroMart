// import {useParams } from "react-router-dom";
// import axios from "axios";

// export async function (userId, wishlistId, products, dispatchProduct) {
//     const {userId} = useParams();

//     const addCartURL = wishlistId === null ? `http://localhost:5000/wishlist/${userId}` : `http://localhost:5000/wishlist/${userId}/${wishlistId}` 
//     const {data, status} = await axios.post(addCartURL, {
//         products
//     })

//     if(status === 201 && data.success === true) {

//     }

    
// }