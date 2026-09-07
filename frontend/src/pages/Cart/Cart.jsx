import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    LockKeyhole,
    ShoppingBag,
    Trash2,
    Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import CartEmpty from "../../components/cart/CartEmpty";

function Cart() {
    const {
        cartItems,
        cartTotal,
        clearCart,
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <motion.main
                className="container py-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Link
                        to="/products"
                        className="text-decoration-none d-inline-flex align-items-center gap-2"
                        style={{
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        <ArrowLeft size={15} />
                        Continue Shopping
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-5">
                    <div className="d-flex align-items-center gap-3">
                        <motion.div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "15px",
                                background: "#111111",
                                color: "#ffffff",
                                flexShrink: 0,
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.45,
                                type: "spring",
                                stiffness: 180,
                            }}
                        >
                            <ShoppingBag size={23} />
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
                                SneakX Collection
                            </p>

                            <h1
                                className="fw-bold mb-0"
                                style={{
                                    fontSize: "clamp(30px, 5vw, 46px)",
                                    letterSpacing: "-1.5px",
                                    lineHeight: 1,
                                }}
                            >
                                Shopping Cart
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div
                    style={{
                        borderRadius: "24px",
                        background:
                            "linear-gradient(135deg, #fafafa 0%, #f3f3f3 100%)",
                        border: "1px solid #eeeeee",
                        overflow: "hidden",
                    }}
                >
                    <CartEmpty />
                </div>
            </motion.main>
        );
    }

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
            {/* Top Navigation */}
            <div className="d-flex justify-content-between align-items-center mb-4">
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
                        className="d-flex align-items-center justify-content-center"
                        whileHover={{ x: -3 }}
                    >
                        <ArrowLeft size={15} />
                    </motion.span>

                    Continue Shopping
                </Link>

                <motion.button
                    type="button"
                    onClick={clearCart}
                    className="btn d-inline-flex align-items-center gap-2"
                    style={{
                        border: "1px solid #e9e9e9",
                        borderRadius: "11px",
                        background: "#ffffff",
                        color: "#777777",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "9px 13px",
                    }}
                    whileHover={{
                        color: "#dc3545",
                        borderColor: "#f0cccc",
                        background: "#fffafa",
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    <Trash2 size={14} />
                    Clear Cart
                </motion.button>
            </div>

            {/* Premium Header */}
            <div className="mb-4 mb-md-5">
                <div className="row align-items-end g-3">

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
                                <ShoppingBag size={24} />
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
                                    Your SneakX Bag
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
                                    Shopping Cart
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Item Count */}
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
                                {cartItems.length}
                            </span>

                            <span
                                style={{
                                    fontSize: "11px",
                                    color: "#666666",
                                    fontWeight: "600",
                                }}
                            >
                                {cartItems.length === 1
                                    ? "Item"
                                    : "Items"}{" "}
                                in your bag
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Strip */}
            <motion.div
                className="row g-2 g-md-3 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.45,
                    delay: 0.15,
                }}
            >
                <div className="col-12 col-md-4">
                    <div
                        className="d-flex align-items-center gap-3 h-100 px-3 py-3"
                        style={{
                            borderRadius: "14px",
                            background: "#fafafa",
                            border: "1px solid #eeeeee",
                        }}
                    >
                        <Truck
                            size={18}
                            color="#ff5a1f"
                            strokeWidth={1.8}
                        />

                        <div>
                            <p
                                className="fw-semibold mb-0"
                                style={{
                                    fontSize: "11px",
                                }}
                            >
                                Fast Delivery
                            </p>

                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#888888",
                                }}
                            >
                                Reliable doorstep delivery
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div
                        className="d-flex align-items-center gap-3 h-100 px-3 py-3"
                        style={{
                            borderRadius: "14px",
                            background: "#fafafa",
                            border: "1px solid #eeeeee",
                        }}
                    >
                        <CheckCircle2
                            size={18}
                            color="#ff5a1f"
                            strokeWidth={1.8}
                        />

                        <div>
                            <p
                                className="fw-semibold mb-0"
                                style={{
                                    fontSize: "11px",
                                }}
                            >
                                Quality Sneakers
                            </p>

                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#888888",
                                }}
                            >
                                Carefully selected for you
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div
                        className="d-flex align-items-center gap-3 h-100 px-3 py-3"
                        style={{
                            borderRadius: "14px",
                            background: "#fafafa",
                            border: "1px solid #eeeeee",
                        }}
                    >
                        <LockKeyhole
                            size={18}
                            color="#ff5a1f"
                            strokeWidth={1.8}
                        />

                        <div>
                            <p
                                className="fw-semibold mb-0"
                                style={{
                                    fontSize: "11px",
                                }}
                            >
                                Secure Checkout
                            </p>

                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#888888",
                                }}
                            >
                                Your shopping experience matters
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Cart */}
            <div className="row g-4 g-xl-5 align-items-start">

                {/* Cart Items */}
                <div className="col-lg-8">

                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <p
                                className="text-uppercase fw-semibold mb-1"
                                style={{
                                    fontSize: "9px",
                                    letterSpacing: "1.5px",
                                    color: "#999999",
                                }}
                            >
                                Selected Products
                            </p>

                            <h5
                                className="fw-bold mb-0"
                                style={{
                                    fontSize: "17px",
                                }}
                            >
                                Your Sneakers
                            </h5>
                        </div>
                    </div>

                    <CartList items={cartItems} />
                </div>

                {/* Summary */}
                <div className="col-lg-4">
                    <div
                        style={{
                            position: "sticky",
                            top: "95px",
                        }}
                    >
                        <CartSummary subtotal={cartTotal} />
                    </div>
                </div>
            </div>
        </motion.main>
    );
}

export default Cart;