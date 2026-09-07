import { motion } from "framer-motion";
import {
    ArrowRight,
    Heart,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

function WishlistEmpty() {
    return (
        <motion.div
            className="text-center py-5 px-3"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* Icon */}
            <motion.div
                className="mx-auto position-relative d-flex align-items-center justify-content-center"
                style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg, #f7f7f7 0%, #eeeeee 100%)",
                    color: "#ff5a1f",
                }}
                initial={{
                    scale: 0.8,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 170,
                }}
            >
                <Heart
                    size={40}
                    strokeWidth={1.5}
                />

                <motion.div
                    className="position-absolute"
                    style={{
                        top: "8px",
                        right: "7px",
                    }}
                    animate={{
                        y: [0, -4, 0],
                        rotate: [0, 8, 0],
                    }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Sparkles
                        size={17}
                        strokeWidth={1.7}
                    />
                </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: 0.15,
                }}
            >
                <p
                    className="text-uppercase fw-semibold mb-2 mt-4"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: "#ff5a1f",
                    }}
                >
                    Your SneakX Collection
                </p>

                <h2
                    className="fw-bold mb-2"
                    style={{
                        fontSize:
                            "clamp(26px, 4vw, 36px)",
                        letterSpacing: "-0.8px",
                    }}
                >
                    Your Wishlist is Empty
                </h2>

                <p
                    className="text-muted mx-auto mb-0"
                    style={{
                        maxWidth: "500px",
                        fontSize: "14px",
                        lineHeight: "1.7",
                    }}
                >
                    Save the sneakers you love and come back
                    to them whenever you're ready.
                </p>
            </motion.div>

            {/* CTA */}
            <motion.div
                className="mt-4"
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: 0.25,
                }}
            >
                <motion.div
                    className="d-inline-block"
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                >
                    <Link
                        to="/products"
                        className="btn text-white d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3 text-decoration-none"
                        style={{
                            background: "#111111",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.12)",
                        }}
                    >
                        Explore Sneakers
                        <ArrowRight size={17} />
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default WishlistEmpty;