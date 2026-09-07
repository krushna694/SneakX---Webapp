import { motion } from "framer-motion";
import {
    ArrowLeft,
    Heart,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../../hooks/useWishlist";
import WishlistGrid from "../../components/wishlist/WishlistGrid";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";

function Wishlist() {
    const {
        wishlistItems,
        wishlistCount,
    } = useWishlist();

    return (
        <motion.main
            className="container py-4 py-md-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* Back Navigation */}
            <div className="mb-4">
                <Link
                    to="/products"
                    className="text-decoration-none d-inline-flex align-items-center gap-2"
                    style={{
                        color: "#666666",
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                >
                    <motion.span
                        className="d-flex align-items-center"
                        whileHover={{ x: -3 }}
                    >
                        <ArrowLeft size={15} />
                    </motion.span>

                    Continue Shopping
                </Link>
            </div>

            {/* Header */}
            <div className="row align-items-end g-3 mb-4 mb-md-5">

                <div className="col-md-8">
                    <div className="d-flex align-items-center gap-3">

                        <motion.div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "17px",
                                background: "#111111",
                                color: "#ffffff",
                                flexShrink: 0,
                                boxShadow:
                                    "0 12px 25px rgba(0,0,0,0.12)",
                            }}
                            whileHover={{
                                rotate: -4,
                                scale: 1.04,
                            }}
                        >
                            <Heart
                                size={24}
                                strokeWidth={1.8}
                            />
                        </motion.div>

                        <div>
                            <p
                                className="text-uppercase fw-semibold mb-1"
                                style={{
                                    fontSize: "9px",
                                    letterSpacing: "2px",
                                    color: "#ff5a1f",
                                }}
                            >
                                Your SneakX Collection
                            </p>

                            <h1
                                className="fw-bold mb-0"
                                style={{
                                    fontSize:
                                        "clamp(30px, 5vw, 46px)",
                                    letterSpacing: "-1.5px",
                                    lineHeight: 1,
                                }}
                            >
                                My Wishlist
                            </h1>
                        </div>

                    </div>
                </div>

                {/* Wishlist Count */}
                <div className="col-md-4 text-md-end">
                    <div
                        className="d-inline-flex align-items-center gap-2 px-3 py-2"
                        style={{
                            borderRadius: "30px",
                            background: "#f6f6f6",
                            border: "1px solid #eeeeee",
                        }}
                    >
                        <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                background: "#111111",
                                color: "#ffffff",
                                fontSize: "10px",
                                fontWeight: "700",
                            }}
                        >
                            {wishlistCount}
                        </span>

                        <span
                            style={{
                                fontSize: "11px",
                                color: "#666666",
                                fontWeight: "600",
                            }}
                        >
                            Saved{" "}
                            {wishlistCount === 1
                                ? "sneaker"
                                : "sneakers"}
                        </span>
                    </div>
                </div>

            </div>

            {/* Intro / Collection Strip */}
            <motion.div
                className="d-flex align-items-center justify-content-between gap-3 mb-4 p-3 p-md-4"
                style={{
                    borderRadius: "16px",
                    background:
                        "linear-gradient(135deg, #fafafa 0%, #f3f3f3 100%)",
                    border: "1px solid #eeeeee",
                }}
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                    delay: 0.12,
                }}
            >
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "11px",
                            background: "#ffffff",
                            color: "#ff5a1f",
                        }}
                    >
                        <Sparkles size={17} />
                    </div>

                    <div>
                        <p
                            className="fw-semibold mb-1"
                            style={{
                                fontSize: "12px",
                            }}
                        >
                            Your saved favorites
                        </p>

                        <p
                            className="mb-0"
                            style={{
                                fontSize: "10px",
                                color: "#888888",
                            }}
                        >
                            Keep the pairs you love close.
                        </p>
                    </div>
                </div>

                <span
                    className="d-none d-md-block text-uppercase fw-semibold"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "1.5px",
                        color: "#aaaaaa",
                    }}
                >
                    SneakX / Wishlist
                </span>
            </motion.div>

            {/* Wishlist Content */}
            {wishlistItems.length === 0 ? (
                <div
                    style={{
                        borderRadius: "24px",
                        background:
                            "linear-gradient(135deg, #fafafa 0%, #f3f3f3 100%)",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                    }}
                >
                    <WishlistEmpty />
                </div>
            ) : (
                <>
                    <div className="d-flex align-items-end justify-content-between mb-3">
                        <div>
                            <p
                                className="text-uppercase fw-semibold mb-1"
                                style={{
                                    fontSize: "9px",
                                    letterSpacing: "1.5px",
                                    color: "#999999",
                                }}
                            >
                                Saved Products
                            </p>

                            <h5
                                className="fw-bold mb-0"
                                style={{
                                    fontSize: "17px",
                                }}
                            >
                                Your Favorites
                            </h5>
                        </div>
                    </div>

                    <WishlistGrid
                        products={wishlistItems}
                    />
                </>
            )}
        </motion.main>
    );
}

export default Wishlist;