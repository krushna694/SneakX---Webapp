import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    LockKeyhole,
    ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartSummary({ subtotal }) {
    const navigate = useNavigate();

    const shipping = subtotal > 0 ? 100 : 0;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <motion.div
            className="card border-0"
            style={{
                borderRadius: "20px",
                background: "#ffffff",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.08)",
            }}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="card-body p-4 p-lg-4">

                {/* Header */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                            background: "#111111",
                            color: "#ffffff",
                        }}
                    >
                        <ShoppingBag size={19} />
                    </div>

                    <div>
                        <p
                            className="text-uppercase fw-semibold mb-1"
                            style={{
                                fontSize: "9px",
                                letterSpacing: "1.7px",
                                color: "#999999",
                            }}
                        >
                            Your Order
                        </p>

                        <h4
                            className="fw-bold mb-0"
                            style={{
                                fontSize: "19px",
                            }}
                        >
                            Cart Summary
                        </h4>
                    </div>
                </div>

                {/* Price Details */}
                <div
                    className="p-3 mb-3"
                    style={{
                        borderRadius: "14px",
                        background: "#f8f8f8",
                    }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <span
                            style={{
                                fontSize: "13px",
                                color: "#777777",
                            }}
                        >
                            Subtotal
                        </span>

                        <span
                            className="fw-semibold"
                            style={{
                                fontSize: "13px",
                            }}
                        >
                            ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <span
                            style={{
                                fontSize: "13px",
                                color: "#777777",
                            }}
                        >
                            Shipping
                        </span>

                        <span
                            className="fw-semibold"
                            style={{
                                fontSize: "13px",
                            }}
                        >
                            ₹{shipping.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>

                {/* Shipping Note */}
                <div
                    className="d-flex align-items-center gap-2 mb-4"
                    style={{
                        fontSize: "11px",
                        color: "#666666",
                    }}
                >
                    <Check
                        size={15}
                        color="#ff5a1f"
                        strokeWidth={2.5}
                    />

                    <span>
                        Fast and reliable delivery
                    </span>
                </div>

                <hr
                    style={{
                        borderColor: "#eeeeee",
                        opacity: 1,
                    }}
                />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-end my-4">
                    <div>
                        <p
                            className="text-uppercase fw-semibold mb-1"
                            style={{
                                fontSize: "9px",
                                letterSpacing: "1.5px",
                                color: "#999999",
                            }}
                        >
                            Total Amount
                        </p>

                        <span
                            style={{
                                fontSize: "12px",
                                color: "#777777",
                            }}
                        >
                            Including shipping
                        </span>
                    </div>

                    <span
                        className="fw-bold"
                        style={{
                            fontSize: "25px",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        ₹{total.toLocaleString("en-IN")}
                    </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                    type="button"
                    onClick={handleCheckout}
                    className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{
                        background: "#111111",
                        borderRadius: "12px",
                        padding: "13px 18px",
                        fontSize: "13px",
                        fontWeight: "600",
                        boxShadow:
                            "0 10px 25px rgba(0, 0, 0, 0.12)",
                    }}
                    whileHover={{
                        scale: 1.02,
                        backgroundColor: "#ff5a1f",
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                >
                    Proceed to Checkout
                    <ArrowRight size={17} />
                </motion.button>

                {/* Security */}
                <div
                    className="d-flex justify-content-center align-items-center gap-2 mt-3"
                    style={{
                        fontSize: "10px",
                        color: "#999999",
                    }}
                >
                    <LockKeyhole size={13} />

                    <span>
                        Secure checkout
                    </span>
                </div>

            </div>
        </motion.div>
    );
}

export default CartSummary;