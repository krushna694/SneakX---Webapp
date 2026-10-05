import { motion } from "framer-motion";
import {
    ArrowRight,
    Heart,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

function WishlistEmpty() {
    return (
        <motion.section
            className="text-center py-5 px-3"
            aria-labelledby="wishlist-empty-title"
            initial={{
                opacity: 0,
                y: 25,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* ==========================================
                EMPTY STATE ICON
            ========================================== */}

            <motion.div
                className="mx-auto position-relative d-flex align-items-center justify-content-center"
                style={{
                    width: "104px",
                    height: "104px",
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg, #f8f8f8 0%, #eeeeee 100%)",
                    color: "#ff5a1f",
                    boxShadow:
                        "0 18px 45px rgba(0, 0, 0, 0.08)",
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
                    duration: 0.55,
                    type: "spring",
                    stiffness: 170,
                    damping: 14,
                }}
                aria-hidden="true"
            >
                {/* Decorative glow */}

                <motion.div
                    className="position-absolute rounded-circle"
                    style={{
                        width: "75px",
                        height: "75px",
                        background:
                            "rgba(255, 90, 31, 0.08)",
                        filter: "blur(18px)",
                        zIndex: 0,
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <Heart
                    size={42}
                    strokeWidth={1.5}
                    style={{
                        position: "relative",
                        zIndex: 1,
                    }}
                />

                {/* Floating sparkle */}

                <motion.div
                    className="position-absolute"
                    style={{
                        top: "4px",
                        right: "3px",
                        color: "#ff5a1f",
                    }}
                    animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Sparkles
                        size={18}
                        strokeWidth={1.7}
                    />
                </motion.div>
            </motion.div>

            {/* ==========================================
                TEXT CONTENT
            ========================================== */}

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
                    id="wishlist-empty-title"
                    className="fw-bold mb-3"
                    style={{
                        fontSize:
                            "clamp(26px, 4vw, 36px)",
                        letterSpacing: "-0.8px",
                        lineHeight: "1.15",
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
                    Save the sneakers you love and
                    come back to them whenever you're
                    ready.
                </p>
            </motion.div>

            {/* ==========================================
                FEATURE HINTS
            ========================================== */}

            <motion.div
                className="d-flex flex-wrap justify-content-center gap-2 mt-4"
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: 0.2,
                }}
            >
                {[
                    "Save your favorites",
                    "Compare later",
                    "Shop when ready",
                ].map((label) => (
                    <span
                        key={label}
                        className="px-3 py-2"
                        style={{
                            borderRadius: "999px",
                            background: "#f7f7f7",
                            border:
                                "1px solid #eeeeee",
                            color: "#777777",
                            fontSize: "10px",
                            fontWeight: "600",
                        }}
                    >
                        {label}
                    </span>
                ))}
            </motion.div>

            {/* ==========================================
                CTA
            ========================================== */}

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
                    delay: 0.28,
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
                                "0 10px 25px rgba(0, 0, 0, 0.12)",
                        }}
                        aria-label="Explore SneakX products"
                    >
                        Explore Sneakers

                        <motion.span
                            className="d-flex align-items-center"
                            whileHover={{
                                x: 3,
                            }}
                        >
                            <ArrowRight size={17} />
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default WishlistEmpty;