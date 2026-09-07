import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Heart,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <motion.article
            className="h-100 position-relative overflow-hidden"
            style={{
                borderRadius: "20px",
                background: "#ffffff",
                border: "1px solid #e9e9e7",
                boxShadow:
                    "0 8px 30px rgba(0, 0, 0, 0.055)",
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
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -9,
                boxShadow:
                    "0 22px 50px rgba(0, 0, 0, 0.12)",
            }}
        >
            {/* =========================================
                PRODUCT VISUAL
            ========================================== */}

            <div
                className="position-relative overflow-hidden"
                style={{
                    height: "275px",
                    background:
                        "linear-gradient(145deg, #f7f7f5 0%, #ededeb 100%)",
                }}
            >
                {/* Background glow */}
                <motion.div
                    className="position-absolute top-50 start-50 translate-middle rounded-circle"
                    style={{
                        width: "210px",
                        height: "210px",
                        background:
                            "rgba(255, 90, 31, 0.10)",
                        filter: "blur(45px)",
                    }}
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Decorative ring */}
                <motion.div
                    className="position-absolute top-50 start-50 translate-middle rounded-circle"
                    style={{
                        width: "205px",
                        height: "205px",
                        border:
                            "1px solid rgba(17,17,17,0.07)",
                    }}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Brand badge */}
                <div
                    className="position-absolute top-0 start-0 m-3 px-2 py-1"
                    style={{
                        borderRadius: "7px",
                        background: "#111111",
                        color: "#ffffff",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                    }}
                >
                    SNEAKX
                </div>

                {/* Category badge */}
                {product.category && (
                    <div
                        className="position-absolute top-0 end-0 m-3 px-2 py-1"
                        style={{
                            borderRadius: "100px",
                            background:
                                "rgba(255,255,255,0.88)",
                            color: "#555",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            backdropFilter: "blur(8px)",
                            border:
                                "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        {product.category}
                    </div>
                )}

                {/* Product visual */}
                <motion.div
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{
                        width: "190px",
                        height: "118px",
                        borderRadius:
                            "58% 45% 38% 32%",
                        background:
                            "linear-gradient(145deg, #ffffff 0%, #eeeeef 52%, #c4c4c7 100%)",
                        boxShadow:
                            "22px 24px 32px rgba(0,0,0,0.15)",
                        transformOrigin: "center",
                    }}
                    animate={{
                        y: [0, -5, 0],
                        rotate: [-7, -5, -7],
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    whileHover={{
                        scale: 1.09,
                        rotate: -2,
                    }}
                >
                    {/* Sneaker upper highlight */}
                    <span
                        style={{
                            position: "absolute",
                            width: "82px",
                            height: "42px",
                            top: "12px",
                            left: "28px",
                            borderTop:
                                "4px solid rgba(255,255,255,0.9)",
                            borderRadius: "50%",
                            transform: "rotate(-12deg)",
                        }}
                    />

                    {/* Sneaker accent */}
                    <span
                        style={{
                            position: "absolute",
                            width: "68px",
                            height: "27px",
                            left: "47px",
                            bottom: "24px",
                            borderLeft:
                                "7px solid var(--sx-accent)",
                            borderBottom:
                                "7px solid var(--sx-accent)",
                            borderRadius: "50%",
                            transform: "rotate(-20deg)",
                        }}
                    />

                    {/* Sole */}
                    <span
                        style={{
                            position: "absolute",
                            left: "-9px",
                            right: "-9px",
                            bottom: "-14px",
                            height: "26px",
                            borderRadius:
                                "0 0 26px 26px",
                            background:
                                "linear-gradient(#ffffff, #b9b9bd)",
                            boxShadow:
                                "0 8px 12px rgba(0,0,0,0.08)",
                        }}
                    />

                    {/* Sole line */}
                    <span
                        style={{
                            position: "absolute",
                            left: "10px",
                            right: "10px",
                            bottom: "-5px",
                            height: "2px",
                            borderRadius: "10px",
                            background:
                                "rgba(17,17,17,0.10)",
                        }}
                    />
                </motion.div>

                {/* Floating action */}
                <motion.div
                    className="position-absolute bottom-0 end-0 m-3"
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                        y: 8,
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    <Link
                        to={`/products/${product.id}`}
                        className="d-flex align-items-center justify-content-center text-decoration-none"
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            background: "#ffffff",
                            color: "#111111",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.13)",
                        }}
                        aria-label={`View ${product.name}`}
                    >
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>
            </div>

            {/* =========================================
                PRODUCT INFORMATION
            ========================================== */}

            <div
                className="p-4"
                style={{
                    background: "#ffffff",
                }}
            >
                {/* Product type */}
                <div
                    className="d-flex align-items-center gap-2 mb-2"
                    style={{
                        color: "#929297",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                    }}
                >
                    <ShoppingBag size={13} />

                    Sneaker
                </div>

                {/* Product name */}
                <h3
                    className="mb-2"
                    style={{
                        color: "#111113",
                        fontSize: "1.15rem",
                        fontWeight: 750,
                        letterSpacing: "-0.025em",
                    }}
                >
                    {product.name}
                </h3>

                {/* Price + action */}
                <div className="d-flex align-items-center justify-content-between gap-3">

                    <div>
                        <span
                            style={{
                                color: "#111113",
                                fontSize: "1.2rem",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            ₹
                            {product.price.toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>

                    {/* Product action */}
                    <motion.div
                        whileHover={{
                            scale: 1.07,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                    >
                        <Link
                            to={`/products/${product.id}`}
                            className="d-flex align-items-center justify-content-center text-decoration-none"
                            style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background: "#111111",
                                color: "#ffffff",
                                transition:
                                    "background-color 200ms ease, transform 200ms ease",
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.background =
                                    "var(--sx-accent)";
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.background =
                                    "#111111";
                            }}
                            aria-label={`Open ${product.name}`}
                        >
                            <ArrowUpRight size={19} />
                        </Link>
                    </motion.div>

                </div>

                {/* Bottom navigation */}
                <div
                    className="d-flex align-items-center justify-content-between mt-4 pt-3"
                    style={{
                        borderTop:
                            "1px solid #eeeeec",
                    }}
                >

                    <Link
                        to={`/products/${product.id}`}
                        className="d-inline-flex align-items-center gap-2 text-decoration-none"
                        style={{
                            color: "#55555a",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                        }}
                    >
                        View Product

                        <motion.span
                            whileHover={{
                                x: 4,
                            }}
                        >
                            <ArrowUpRight size={14} />
                        </motion.span>
                    </Link>

                    {/* Wishlist visual indicator */}
                    <motion.div
                        whileHover={{
                            scale: 1.12,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#77777b",
                            cursor: "pointer",
                        }}
                        title="Wishlist"
                    >
                        <Heart
                            size={17}
                            strokeWidth={1.8}
                        />
                    </motion.div>

                </div>

            </div>
        </motion.article>
    );
}

export default ProductCard;