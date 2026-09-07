import { motion } from "framer-motion";
import {
    ArrowRight,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function CartEmpty() {
    return (
        <motion.div
            className="text-center py-5 px-3"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Icon */}
            <motion.div
                className="mx-auto d-flex align-items-center justify-content-center"
                style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "50%",
                    background: "#f5f5f5",
                    color: "#ff5a1f",
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.45,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 180,
                }}
            >
                <ShoppingBag size={36} strokeWidth={1.7} />
            </motion.div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.2,
                }}
            >
                <p
                    className="text-uppercase fw-semibold mb-2 mt-4"
                    style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#999999",
                    }}
                >
                    Your SneakX Bag
                </p>

                <h2
                    className="fw-bold mb-2"
                    style={{
                        fontSize: "clamp(25px, 4vw, 36px)",
                        letterSpacing: "-0.8px",
                    }}
                >
                    Your Cart is Empty
                </h2>

                <p
                    className="text-muted mx-auto mb-0"
                    style={{
                        maxWidth: "480px",
                        lineHeight: "1.7",
                        fontSize: "14px",
                    }}
                >
                    Looks like you haven't added any sneakers yet.
                    Discover your next favorite pair and add it to
                    your collection.
                </p>
            </motion.div>

            {/* Button */}
            <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.3,
                }}
            >
                <motion.div
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    className="d-inline-block"
                >
                    <Link
                        to="/products"
                        className="btn text-white d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3 text-decoration-none"
                        style={{
                            background: "#111111",
                            borderRadius: "12px",
                            fontSize: "13px",
                            fontWeight: "600",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.12)",
                        }}
                    >
                        Continue Shopping
                        <ArrowRight size={17} />
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default CartEmpty;