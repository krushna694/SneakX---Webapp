import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

function CartSummary({ subtotal }) {
    const navigate = useNavigate();

    const shipping = subtotal > 0 ? 100 : 0;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <motion.div
            className="card border-0 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="card-body p-4">

                {/* Header */}
                <div className="d-flex align-items-center gap-2 mb-4">
                    <ShoppingBag size={21} />

                    <h4 className="fw-bold mb-0">
                        Cart Summary
                    </h4>
                </div>

                {/* Subtotal */}
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                        Subtotal
                    </span>

                    <span className="fw-semibold">
                        ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                </div>

                {/* Shipping */}
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                        Shipping
                    </span>

                    <span className="fw-semibold">
                        ₹{shipping.toLocaleString("en-IN")}
                    </span>
                </div>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">
                        Total
                    </span>

                    <span className="fw-bold">
                        ₹{total.toLocaleString("en-IN")}
                    </span>
                </div>

                {/* Checkout */}
                <motion.button
                    type="button"
                    className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleCheckout}
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                </motion.button>

            </div>
        </motion.div>
    );
}

export default CartSummary;