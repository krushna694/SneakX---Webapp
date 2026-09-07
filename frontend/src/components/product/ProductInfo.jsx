import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Heart,
    ShoppingBag,
    ShieldCheck,
    Truck,
} from "lucide-react";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function ProductInfo({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");

    const { addToCart } = useCart();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist();

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setCartMessage("Please select a size first.");
            return;
        }

        addToCart(
            product,
            quantity,
            selectedSize
        );

        setCartMessage("Added to your cart.");

        setTimeout(() => {
            setCartMessage("");
        }, 2500);
    };

    const handleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setCartMessage("");
    };

    return (
        <div>

            {/* =========================================
                PURCHASE PANEL
            ========================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.2,
                }}
            >

                {/* Size */}

                <SizeSelector
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
                />

                {/* Quantity */}

                <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                />

                {/* =====================================
                    ACTION BUTTONS
                ====================================== */}

                <div className="d-flex gap-2 mt-4">

                    {/* Add To Cart */}

                    <motion.button
                        type="button"
                        onClick={handleAddToCart}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2 border-0 text-white"
                        style={{
                            minHeight: "54px",
                            borderRadius: "13px",
                            background:
                                "var(--sx-accent)",
                            fontSize: "0.82rem",
                            fontWeight: 800,
                            letterSpacing:
                                "-0.01em",
                            boxShadow:
                                "0 10px 25px rgba(255,90,31,0.20)",
                        }}
                    >
                        <ShoppingBag size={18} />

                        Add to Cart
                    </motion.button>

                    {/* Wishlist */}

                    <motion.button
                        type="button"
                        onClick={handleWishlist}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="btn d-flex align-items-center justify-content-center border"
                        style={{
                            width: "54px",
                            minWidth: "54px",
                            height: "54px",
                            borderRadius: "13px",
                            background:
                                inWishlist
                                    ? "#111111"
                                    : "#ffffff",
                            color:
                                inWishlist
                                    ? "#ffffff"
                                    : "#111111",
                            borderColor:
                                "#dededb",
                        }}
                        aria-label={
                            inWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                    >
                        <Heart
                            size={19}
                            fill={
                                inWishlist
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </motion.button>

                </div>

                {/* =====================================
                    CART MESSAGE
                ====================================== */}

                <AnimatePresence>
                    {cartMessage && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            className="d-flex align-items-center gap-2 mt-3"
                            style={{
                                color:
                                    cartMessage.includes(
                                        "Please"
                                    )
                                        ? "#d64545"
                                        : "#248a52",
                                fontSize: "0.74rem",
                                fontWeight: 700,
                            }}
                        >
                            <Check size={15} />

                            {cartMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* =====================================
                    PURCHASE INFORMATION
                ====================================== */}

                <div
                    className="mt-4"
                    style={{
                        borderTop:
                            "1px solid #e5e5e2",
                    }}
                >

                    {/* Delivery */}

                    <div
                        className="d-flex align-items-center gap-3 py-3"
                        style={{
                            borderBottom:
                                "1px solid #e5e5e2",
                        }}
                    >

                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "11px",
                                background:
                                    "#f2f2ef",
                            }}
                        >
                            <Truck size={17} />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize:
                                        "0.75rem",
                                    fontWeight: 800,
                                    color:
                                        "#222222",
                                }}
                            >
                                Fast & Reliable Delivery
                            </div>

                            <div
                                style={{
                                    fontSize:
                                        "0.68rem",
                                    color:
                                        "#999999",
                                    marginTop:
                                        "2px",
                                }}
                            >
                                Delivered safely to your
                                doorstep
                            </div>
                        </div>

                    </div>

                    {/* Secure checkout */}

                    <div
                        className="d-flex align-items-center gap-3 py-3"
                    >

                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "11px",
                                background:
                                    "#f2f2ef",
                            }}
                        >
                            <ShieldCheck size={17} />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize:
                                        "0.75rem",
                                    fontWeight: 800,
                                    color:
                                        "#222222",
                                }}
                            >
                                Secure Checkout
                            </div>

                            <div
                                style={{
                                    fontSize:
                                        "0.68rem",
                                    color:
                                        "#999999",
                                    marginTop:
                                        "2px",
                                }}
                            >
                                Your purchase is protected
                            </div>
                        </div>

                    </div>

                </div>

                {/* =====================================
                    WISHLIST STATUS
                ====================================== */}

                <AnimatePresence mode="wait">

                    {inWishlist && (
                        <motion.div
                            key="wishlist-added"
                            initial={{
                                opacity: 0,
                                scale: 0.96,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.96,
                            }}
                            className="mt-3 px-3 py-2 d-flex align-items-center gap-2"
                            style={{
                                borderRadius: "10px",
                                background:
                                    "#fff4ef",
                                color:
                                    "var(--sx-accent)",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                            }}
                        >
                            <Heart
                                size={14}
                                fill="currentColor"
                            />

                            Saved to your wishlist
                        </motion.div>
                    )}

                </AnimatePresence>

            </motion.div>

        </div>
    );
}

export default ProductInfo;