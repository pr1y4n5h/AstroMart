import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes,Route} from "react-router-dom";
import {CartPage} from "./Pages/CartPage";
import {HomePage} from "./Pages/HomePage";
import {ProductsPage} from "./Pages/ProductsPage";
import {WishlistPage} from "./Pages/WishlistPage";
import {LoginPage} from "./Pages/LoginPage";
import {ProductDetails} from "./Components/ProductDetails"



export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main">      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productID" element={<ProductDetails /> } />
        <Route path="/login" element={<LoginPage />} />   
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} /> 
        </Routes>
      </main>
    </div>
  );
}

