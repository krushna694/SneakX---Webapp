import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    Heart,
    Home,
    Menu,
    ShoppingBag,
    ShoppingCart,
    Sparkles,
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
    const [shopOpen, setShopOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setShopOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `sx-navbar-link ${isActive ? "active" : ""}`;

    const categoryLinks = [
        {
            title: "All Sneakers",
            description: "Explore the complete collection",
            icon: Store,
            to: "/products",
        },
        {
            title: "Running",
            description: "Built for everyday movement",
            icon: ShoppingBag,
            to: "/products?category=Running",
        },
        {
            title: "Lifestyle",
            description: "Everyday style and comfort",
            icon: Sparkles,
            to: "/products?category=Lifestyle",
        },
        {
            title: "Sports",
            description: "Performance-inspired sneakers",
            icon: ShoppingCart,
            to: "/products?category=Sports",
        },
    ];

    return (
        <motion.nav
            className="sx-navbar"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
        >
            <div className="container">

                <div className="sx-navbar-inner">

                    {/* =================================================
                        LEFT — BRAND
                    ================================================= */}

                    <div className="sx-navbar-left">

                        <Link
                            to="/"
                            className="sx-brand"
                            onClick={closeMobileMenu}
                        >
                            <span className="sx-brand-mark">
                                S
                            </span>

                            <span className="sx-brand-text">
                                Sneak<span>X</span>
                            </span>
                        </Link>

                    </div>


                    {/* =================================================
                        CENTER — DESKTOP NAVIGATION
                    ================================================= */}

                    <div className="sx-desktop-navigation">

                        {/* HOME */}

                        <NavLink
                            to="/"
                            className={navLinkClass}
                        >
                            Home
                        </NavLink>


                        {/* =================================================
                            SHOP MEGA MENU
                        ================================================= */}

                        <div
                            className="sx-shop-wrapper"
                            onMouseEnter={() => setShopOpen(true)}
                            onMouseLeave={() => setShopOpen(false)}
                        >

                            <button
                                type="button"
                                className={`sx-navbar-link sx-shop-button ${shopOpen ? "active" : ""
                                    }`}
                                onClick={() =>
                                    setShopOpen((prev) => !prev)
                                }
                            >
                                <span>
                                    Shop
                                </span>

                                <motion.span
                                    className="sx-shop-arrow"
                                    animate={{
                                        rotate: shopOpen ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <ChevronDown size={15} />
                                </motion.span>
                            </button>


                            <AnimatePresence>

                                {shopOpen && (
                                    <motion.div
                                        className="sx-mega-menu"
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        transition={{
                                            duration: 0.18,
                                        }}
                                    >

                                        {/* HEADER */}

                                        <div className="sx-mega-header">

                                            <div>

                                                <span className="sx-mega-eyebrow">
                                                    SHOP SNEAKX
                                                </span>

                                                <h5>
                                                    Find your perfect pair.
                                                </h5>

                                            </div>

                                            <Link
                                                to="/products"
                                                className="sx-mega-view-all"
                                                onClick={() =>
                                                    setShopOpen(false)
                                                }
                                            >
                                                View All
                                            </Link>

                                        </div>


                                        {/* CATEGORY GRID */}

                                        <div className="sx-mega-grid">

                                            {categoryLinks.map(
                                                (category) => {

                                                    const Icon =
                                                        category.icon;

                                                    return (
                                                        <Link
                                                            key={
                                                                category.title
                                                            }
                                                            to={
                                                                category.to
                                                            }
                                                            className="sx-mega-item"
                                                            onClick={() =>
                                                                setShopOpen(
                                                                    false
                                                                )
                                                            }
                                                        >

                                                            <span className="sx-mega-icon">

                                                                <Icon
                                                                    size={18}
                                                                    strokeWidth={
                                                                        1.8
                                                                    }
                                                                />

                                                            </span>


                                                            <span className="sx-mega-content">

                                                                <strong>
                                                                    {
                                                                        category.title
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    {
                                                                        category.description
                                                                    }
                                                                </small>

                                                            </span>

                                                        </Link>
                                                    );
                                                }
                                            )}

                                        </div>


                                        {/* FOOTER */}

                                        <div className="sx-mega-footer">

                                            <span>
                                                Premium sneakers. Everyday
                                                confidence.
                                            </span>

                                            <Link
                                                to="/products"
                                                onClick={() =>
                                                    setShopOpen(false)
                                                }
                                            >
                                                Explore Collection
                                            </Link>

                                        </div>

                                    </motion.div>
                                )}

                            </AnimatePresence>

                        </div>


                        {/* NEW ARRIVALS */}

                        <NavLink
                            to="/products"
                            className={navLinkClass}
                        >
                            New Arrivals
                        </NavLink>

                    </div>


                    {/* =================================================
                        RIGHT — ACTIONS
                    ================================================= */}

                    <div className="sx-navbar-right">

                        {/* WISHLIST */}

                        <NavLink
                            to="/wishlist"
                            className={`${navLinkClass} sx-icon-nav-link`}
                            aria-label="Wishlist"
                            title="Wishlist"
                        >

                            <span className="sx-icon-wrapper">

                                <Heart
                                    className="sx-navbar-action-icon"
                                    size={21}
                                    strokeWidth={2}
                                />

                                {wishlistCount > 0 && (
                                    <span className="sx-icon-count">
                                        {wishlistCount}
                                    </span>
                                )}

                            </span>

                        </NavLink>


                        {/* CART */}

                        <NavLink
                            to="/cart"
                            className={`${navLinkClass} sx-icon-nav-link`}
                            aria-label="Cart"
                            title="Cart"
                        >

                            <span className="sx-icon-wrapper">

                                <ShoppingCart
                                    className="sx-navbar-action-icon"
                                    size={21}
                                    strokeWidth={2}
                                />

                                {cartCount > 0 && (
                                    <span className="sx-icon-count">
                                        {cartCount}
                                    </span>
                                )}

                            </span>

                        </NavLink>


                        {/* USER */}

                        <div className="sx-desktop-user">
                            <UserMenu />
                        </div>

                    </div>


                    {/* =================================================
                        MOBILE ACTIONS
                    ================================================= */}

                    <div className="sx-mobile-actions">

                        <div className="sx-mobile-user">
                            <UserMenu />
                        </div>

                        <motion.button
                            type="button"
                            className={`sx-mobile-menu-button ${mobileOpen ? "open" : ""
                                }`}
                            onClick={() =>
                                setMobileOpen((prev) => !prev)
                            }
                            whileTap={{
                                scale: 0.92,
                            }}
                            aria-label={
                                mobileOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                        >

                            {mobileOpen ? (
                                <X size={22} />
                            ) : (
                                <Menu size={22} />
                            )}

                        </motion.button>

                    </div>

                </div>

            </div>


            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            <AnimatePresence>

                {mobileOpen && (
                    <motion.div
                        className="sx-mobile-navigation"
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                        }}
                    >

                        <div className="container">

                            <div className="sx-mobile-menu">

                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                    onClick={closeMobileMenu}
                                >
                                    <Home
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        Home
                                    </span>
                                </NavLink>


                                <NavLink
                                    to="/products"
                                    className={navLinkClass}
                                    onClick={closeMobileMenu}
                                >
                                    <Store
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        Shop
                                    </span>
                                </NavLink>


                                <NavLink
                                    to="/products"
                                    className={navLinkClass}
                                    onClick={closeMobileMenu}
                                >
                                    <Sparkles
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        New Arrivals
                                    </span>
                                </NavLink>


                                <NavLink
                                    to="/wishlist"
                                    className={navLinkClass}
                                    onClick={closeMobileMenu}
                                >
                                    <Heart
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        Wishlist
                                    </span>

                                    {wishlistCount > 0 && (
                                        <span className="sx-mobile-count">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </NavLink>


                                <NavLink
                                    to="/cart"
                                    className={navLinkClass}
                                    onClick={closeMobileMenu}
                                >
                                    <ShoppingCart
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        Cart
                                    </span>

                                    {cartCount > 0 && (
                                        <span className="sx-mobile-count">
                                            {cartCount}
                                        </span>
                                    )}
                                </NavLink>

                            </div>

                        </div>

                    </motion.div>
                )}

            </AnimatePresence>

        </motion.nav>
    );
}

export default Navbar;