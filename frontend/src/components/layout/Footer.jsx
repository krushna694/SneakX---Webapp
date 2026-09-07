import { motion } from "framer-motion";
import {
    ArrowRight,
    ArrowUp,
    Heart,
    Mail,
    MapPin,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                background: "#0d0d0d",
                color: "#ffffff",
                borderTop: "1px solid #202020",
            }}
        >
            <div className="container">
                {/* MAIN FOOTER */}
                <div
                    className="row g-5"
                    style={{
                        padding: "55px 0 48px",
                    }}
                >
                    {/* BRAND */}
                    <motion.div
                        className="col-12 col-lg-5"
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
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <Link
                            to="/"
                            className="text-decoration-none d-inline-flex align-items-center gap-3"
                        >
                            <span
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "13px",
                                    background: "#ff5a1f",
                                    color: "#ffffff",
                                    boxShadow:
                                        "0 8px 24px rgba(255, 90, 31, 0.20)",
                                }}
                            >
                                <ShoppingBag
                                    size={21}
                                    strokeWidth={2.4}
                                />
                            </span>

                            <span
                                style={{
                                    fontSize: "26px",
                                    fontWeight: "800",
                                    letterSpacing: "-1px",
                                    color: "#ffffff",
                                }}
                            >
                                Sneak
                                <span
                                    style={{
                                        color: "#ff5a1f",
                                    }}
                                >
                                    X
                                </span>
                            </span>
                        </Link>

                        <p
                            className="mb-0"
                            style={{
                                maxWidth: "390px",
                                marginTop: "20px",
                                fontSize: "12px",
                                lineHeight: "1.8",
                                color: "#888888",
                            }}
                        >
                            Step into your style.
                            Discover premium sneakers
                            designed for everyday
                            movement, comfort and
                            confidence.
                        </p>

                        <div
                            className="d-flex flex-column gap-2"
                            style={{
                                marginTop: "22px",
                            }}
                        >
                            <div
                                className="d-flex align-items-center gap-2"
                                style={{
                                    color: "#777777",
                                    fontSize: "10px",
                                }}
                            >
                                <Mail size={14} />
                                Customer Support
                            </div>

                            <div
                                className="d-flex align-items-center gap-2"
                                style={{
                                    color: "#777777",
                                    fontSize: "10px",
                                }}
                            >
                                <MapPin size={14} />
                                India
                            </div>
                        </div>
                    </motion.div>

                    {/* EXPLORE */}
                    <motion.div
                        className="col-6 col-md-4 col-lg-2"
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
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.08,
                        }}
                    >
                        <FooterTitle>
                            Explore
                        </FooterTitle>

                        <FooterLink to="/">
                            Home
                        </FooterLink>

                        <FooterLink to="/products">
                            Products
                        </FooterLink>

                        <FooterLink to="/wishlist">
                            Wishlist
                        </FooterLink>

                        <FooterLink to="/cart">
                            Cart
                        </FooterLink>
                    </motion.div>

                    {/* ACCOUNT */}
                    <motion.div
                        className="col-6 col-md-4 col-lg-2"
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
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.16,
                        }}
                    >
                        <FooterTitle>
                            Account
                        </FooterTitle>

                        <FooterLink to="/profile">
                            My Profile
                        </FooterLink>

                        <FooterLink to="/orders">
                            My Orders
                        </FooterLink>

                        <FooterLink to="/profile/addresses">
                            Addresses
                        </FooterLink>

                        <FooterLink to="/profile/account">
                            Account Details
                        </FooterLink>
                    </motion.div>

                    {/* SHOPPING */}
                    <motion.div
                        className="col-12 col-md-4 col-lg-3"
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
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.24,
                        }}
                    >
                        <FooterTitle>
                            Shopping
                        </FooterTitle>

                        <FooterLink to="/products">
                            Find Your Sneakers
                        </FooterLink>

                        <FooterLink to="/orders">
                            Track Orders
                        </FooterLink>

                        <FooterLink to="/profile/addresses">
                            Delivery Addresses
                        </FooterLink>

                        <div
                            className="d-flex align-items-center gap-2"
                            style={{
                                marginTop: "20px",
                                color: "#666666",
                                fontSize: "10px",
                            }}
                        >
                            <Heart
                                size={13}
                                color="#ff5a1f"
                            />

                            Made for sneaker lovers
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM */}
                <div
                    className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
                    style={{
                        padding: "22px 0 26px",
                        borderTop: "1px solid #242424",
                    }}
                >
                    <div
                        className="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-2"
                        style={{
                            fontSize: "10px",
                            color: "#666666",
                        }}
                    >
                        <span>
                            © {currentYear} SneakX
                        </span>

                        <span
                            style={{
                                color: "#333333",
                            }}
                        >
                            |
                        </span>

                        <span>
                            All rights reserved.
                        </span>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <span
                            style={{
                                fontSize: "10px",
                                color: "#666666",
                            }}
                        >
                            Built for sneaker lovers
                        </span>

                        <motion.button
                            type="button"
                            onClick={scrollToTop}
                            className="d-flex align-items-center justify-content-center"
                            whileHover={{
                                y: -3,
                                borderColor: "#ff5a1f",
                                color: "#ff5a1f",
                            }}
                            whileTap={{
                                scale: 0.92,
                            }}
                            aria-label="Back to top"
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                border: "1px solid #292929",
                                background: "#151515",
                                color: "#aaaaaa",
                                cursor: "pointer",
                            }}
                        >
                            <ArrowUp size={15} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterTitle({ children }) {
    return (
        <h6
            className="text-uppercase fw-bold mb-4"
            style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                color: "#ffffff",
            }}
        >
            {children}
        </h6>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{
                width: "fit-content",
                marginBottom: "15px",
                fontSize: "11px",
                color: "#858585",
                transition:
                    "color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.color =
                    "#ff5a1f";

                event.currentTarget.style.transform =
                    "translateX(3px)";
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.color =
                    "#858585";

                event.currentTarget.style.transform =
                    "translateX(0)";
            }}
        >
            {children}

            <ArrowRight size={12} />
        </Link>
    );
}

export default Footer;