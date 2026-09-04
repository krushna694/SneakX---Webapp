import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../features/authentication/pages/Login";
import Profile from "../pages/Profile/Profile";
import Account from "../pages/Profile/Account";
import Addresses from "../pages/Profile/Addresses";
import Checkout from "../pages/Checkout/Checkout";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/account" element={<Account />} />
            <Route path="/profile/addresses" element={<Addresses />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}

export default AppRoutes;