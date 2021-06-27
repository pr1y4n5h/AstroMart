import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes,Route} from "react-router-dom";
import {CartPage} from "./Pages/CartPage";
import {HomePage} from "./Pages/HomePage";
import {ProductsPage} from "./Pages/ProductsPage";
import {WishlistPage} from "./Pages/WishlistPage";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main">
      
      
      <Routes>
        <Route path="/" element={<HomePage />}> </Route>
        <Route path="/products" element={<ProductsPage />}> </Route>
        <Route path="/cart" element={<CartPage />}> </Route>
        <Route path="/wishlist" element={<WishlistPage />}> </Route>
      </Routes>
      </main>
    </div>
  );
}

