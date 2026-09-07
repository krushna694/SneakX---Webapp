import { motion } from "framer-motion";
import {
    ArrowUp,
    Camera,
    Heart,
    Mail,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="sx-footer">

            <div className="container">

                <div className="sx-footer-main">

                    {/* Brand */}
                    <motion.div
                        className="sx-footer-brand"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="sx-footer-logo"
                        >
                            <span className="sx-footer-logo-mark">
                                <ShoppingBag
                                    size={19}
                                    strokeWidth={2.5}
                                />
                            </span>

                            <span>
                                Sneak<span>X</span>
                            </span>
                        </Link>

                        <p>
                            Step into your style.
                            Discover premium sneakers
                            designed for every move.
                        </p>

                        <div className="sx-footer-socials">
                            <button
                                type="button"
                                aria-label="Instagram"
                                className="sx-social-button"
                            >
                                <Camera size={17} />
                            </button>

                            <button
                                type="button"
                                aria-label="Email"
                                className="sx-social-button"
                            >
                                <Mail size={17} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        className="sx-footer-column"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                        }}
                    >
                        <h6>Explore</h6>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/products">
                            Products
                        </Link>

                        <Link to="/wishlist">
                            Wishlist
                        </Link>

                        <Link to="/cart">
                            Cart
                        </Link>
                    </motion.div>

                    {/* Account */}
                    <motion.div
                        className="sx-footer-column"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                        }}
                    >
                        <h6>Account</h6>

                        <Link to="/profile">
                            My Profile
                        </Link>

                        <Link to="/orders">
                            My Orders
                        </Link>

                        <Link to="/profile/addresses">
                            Addresses
                        </Link>

                        <Link to="/profile/account">
                            Settings
                        </Link>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        className="sx-footer-column"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                        }}
                    >
                        <h6>Support</h6>

                        <span>
                            Fast delivery
                        </span>

                        <span>
                            Secure payments
                        </span>

                        <span>
                            Easy returns
                        </span>

                        <span>
                            Customer support
                        </span>
                    </motion.div>

                </div>

                {/* Bottom */}
                <div className="sx-footer-bottom">

                    <div>
                        <span>
                            © 2026 SneakX.
                        </span>

                        <span>
                            All rights reserved.
                        </span>
                    </div>

                    <div className="sx-footer-bottom-right">

                        <span>
                            Made for sneaker lovers
                        </span>

                        <Heart
                            size={15}
                            fill="currentColor"
                        />

                        <motion.button
                            type="button"
                            className="sx-back-top"
                            onClick={scrollToTop}
                            whileHover={{
                                y: -3,
                            }}
                            whileTap={{
                                scale: 0.92,
                            }}
                            aria-label="Back to top"
                        >
                            <ArrowUp size={16} />
                        </motion.button>

                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;