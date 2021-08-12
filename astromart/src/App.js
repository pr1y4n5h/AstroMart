import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import {Routes,Route} from "react-router-dom";
import {CartPage} from "./Pages/Cart/CartPage";
import {HomePage} from "./Pages/Home/HomePage";
import {ProductsPage} from "./Pages/Products/ProductsPage";
import {WishlistPage} from "./Pages/Wishlist/WishlistPage";
import {LoginPage} from "./Pages/Login/LoginPage";
import {SignupPage} from "./Pages/Signup/SignupPage";
import {ProductDetails} from "./Pages/ProductDetails/ProductDetails";
import {PrivateRoute} from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import {ErrorPage} from "./Pages/Error/ErrorPage"

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productID" element={<ProductDetails /> } />
        <Route path="/sign-up" element={<SignupPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <PrivateRoute path="/cart" element={<CartPage />} />
        <PrivateRoute path="/wishlist" element={<WishlistPage />} />
        <Route path="/*" element={<ErrorPage />} /> 
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

