import { motion } from "framer-motion";
import {
    Heart,
    Home,
    Menu,
    ShoppingBag,
    ShoppingCart,
    Store,
    X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import UserMenu from "./UserMenu";
import "./Navbar.css";

function Navbar() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `sx-navbar-link ${isActive ? "active" : ""}`;

    return (
        <motion.nav
            className="sx-navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="container">
                <div className="sx-navbar-inner">

                    {/* Brand */}
                    <Link
                        to="/"
                        className="sx-brand"
                        onClick={closeMobileMenu}
                    >
                        <span className="sx-brand-mark">
                            <ShoppingBag size={19} strokeWidth={2.5} />
                        </span>

                        <span className="sx-brand-text">
                            Sneak<span>X</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="sx-desktop-navigation">

                        <NavLink
                            to="/"
                            className={navLinkClass}
                        >
                            <Home size={16} />
                            Home
                        </NavLink>

                        <NavLink
                            to="/products"
                            className={navLinkClass}
                        >
                            <Store size={16} />
                            Products
                        </NavLink>

                        <NavLink
                            to="/wishlist"
                            className={navLinkClass}
                        >
                            <Heart size={17} />
                            Wishlist

                            {wishlistCount > 0 && (
                                <span className="sx-nav-count">
                                    {wishlistCount}
                                </span>
                            )}
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={navLinkClass}
                        >
                            <ShoppingCart size={17} />
                            Cart

                            {cartCount > 0 && (
                                <span className="sx-nav-count">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        <UserMenu />

                    </div>

                    {/* Mobile Action Area */}
                    <div className="sx-mobile-actions">
                        <UserMenu />

                        <motion.button
                            type="button"
                            className="sx-mobile-menu-button"
                            onClick={() => setMobileOpen((value) => !value)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? (
                                <X size={22} />
                            ) : (
                                <Menu size={22} />
                            )}
                        </motion.button>
                    </div>

                </div>

                {/* Mobile Navigation */}
                <motion.div
                    className="sx-mobile-navigation"
                    initial={false}
                    animate={{
                        height: mobileOpen ? "auto" : 0,
                        opacity: mobileOpen ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <div className="sx-mobile-navigation-inner">

                        <NavLink
                            to="/"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            <Home size={18} />
                            Home
                        </NavLink>

                        <NavLink
                            to="/products"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            <Store size={18} />
                            Products
                        </NavLink>

                        <NavLink
                            to="/wishlist"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            <Heart size={18} />
                            Wishlist

                            {wishlistCount > 0 && (
                                <span className="sx-nav-count">
                                    {wishlistCount}
                                </span>
                            )}
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={navLinkClass}
                            onClick={closeMobileMenu}
                        >
                            <ShoppingCart size={18} />
                            Cart

                            {cartCount > 0 && (
                                <span className="sx-nav-count">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}

export default Navbar;