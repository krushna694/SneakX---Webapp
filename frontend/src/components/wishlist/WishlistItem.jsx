import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    Check,
    Heart,
    ShoppingBag,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function WishlistItem({ product }) {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const [message, setMessage] = useState("");

    const handleAddToCart = () => {
        addToCart(product, 1, 9);

        setMessage("Added to cart");

        setTimeout(() => {
            setMessage("");
        }, 1800);
    };

    const handleRemove = () => {
        removeFromWishlist(product.id);
    };

    return (
        <motion.article
            className="card h-100 border-0 overflow-hidden position-relative"
            style={{
                borderRadius: "20px",
                background: "#ffffff",
                boxShadow: "0 7px 25px rgba(0, 0, 0, 0.06)",
            }}
            initial={{
                opacity: 0,
                y: 25,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -7,
                boxShadow:
                    "0 18px 40px rgba(0, 0, 0, 0.11)",
            }}
        >
            {/* Product Visual */}
            <div
                className="position-relative overflow-hidden"
                style={{
                    height: "245px",
                    background:
                        "linear-gradient(135deg, #f7f7f7 0%, #eeeeee 100%)",
                }}
            >
                {/* Wishlist Badge */}
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        top: "14px",
                        left: "14px",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        color: "#ff5a1f",
                        boxShadow:
                            "0 6px 18px rgba(0,0,0,0.08)",
                        zIndex: 2,
                    }}
                >
                    <Heart
                        size={17}
                        fill="currentColor"
                        strokeWidth={1.7}
                    />
                </div>

                {/* Product Number */}
                <span
                    className="position-absolute"
                    style={{
                        top: "18px",
                        right: "18px",
                        fontSize: "9px",
                        fontWeight: "700",
                        letterSpacing: "1.5px",
                        color: "#aaaaaa",
                    }}
                >
                    SNX
                </span>

                {/* Sneaker Visual */}
                <motion.div
                    className="position-absolute"
                    style={{
                        width: "150px",
                        height: "65px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        left: "50%",
                        top: "50%",
                        transform:
                            "translate(-50%, -50%) rotate(-12deg) skewX(-12deg)",
                        boxShadow:
                            "0 20px 28px rgba(0,0,0,0.16)",
                    }}
                    whileHover={{
                        scale: 1.08,
                        rotate: -8,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "82px",
                            height: "13px",
                            borderRadius: "50%",
                            background: "#ff5a1f",
                            top: "19px",
                            left: "34px",
                            transform: "rotate(-12deg)",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            width: "155px",
                            height: "12px",
                            borderRadius: "9px",
                            background: "#dddddd",
                            bottom: "-5px",
                            left: "-3px",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            width: "48px",
                            height: "7px",
                            borderRadius: "50%",
                            background: "#cccccc",
                            top: "7px",
                            left: "17px",
                        }}
                    />
                </motion.div>

                {/* View Product */}
                <Link
                    to={`/products/${product.id}`}
                    className="position-absolute bottom-0 end-0 m-3 d-flex align-items-center justify-content-center text-decoration-none"
                    style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "#111111",
                        color: "#ffffff",
                        zIndex: 3,
                    }}
                >
                    <ArrowUpRight size={17} />
                </Link>
            </div>

            {/* Product Information */}
            <div className="card-body p-3 p-md-4 d-flex flex-column">

                <p
                    className="text-uppercase fw-semibold mb-1"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "1.5px",
                        color: "#999999",
                    }}
                >
                    {product.category}
                </p>

                <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                        <Link
                            to={`/products/${product.id}`}
                            className="text-decoration-none text-dark"
                        >
                            <h5
                                className="fw-bold mb-2"
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                {product.name}
                            </h5>
                        </Link>

                        <p
                            className="fw-bold mb-0"
                            style={{
                                fontSize: "17px",
                            }}
                        >
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-4">
                    <div className="d-flex gap-2">

                        <motion.button
                            type="button"
                            onClick={handleAddToCart}
                            className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2 border-0 text-white"
                            style={{
                                background: "#111111",
                                borderRadius: "10px",
                                padding: "10px 12px",
                                fontSize: "11px",
                                fontWeight: "600",
                            }}
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: "#ff5a1f",
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                        >
                            <ShoppingBag size={15} />
                            Add to Cart
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={handleRemove}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{
                                width: "43px",
                                height: "40px",
                                borderRadius: "10px",
                                border: "1px solid #eeeeee",
                                background: "#ffffff",
                                color: "#777777",
                            }}
                            title="Remove from wishlist"
                            whileHover={{
                                color: "#dc3545",
                                borderColor: "#f0cccc",
                                background: "#fffafa",
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                        >
                            <Trash2 size={15} />
                        </motion.button>

                    </div>

                    {/* Feedback */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                className="d-flex align-items-center justify-content-center gap-2 mt-2"
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
                                style={{
                                    color: "#198754",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    overflow: "hidden",
                                }}
                            >
                                <Check size={14} />
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </motion.article>
    );
}

export default WishlistItem;