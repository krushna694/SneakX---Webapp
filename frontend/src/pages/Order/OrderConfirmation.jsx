import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Package,
    ShoppingBag,
    ArrowRight,
} from "lucide-react";

function OrderConfirmation() {
    const location = useLocation();

    const order = location.state?.order;

    return (
        <div className="container py-5">

            <motion.div
                className="text-center py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Success Icon */}
                <motion.div
                    className="mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.4,
                        type: "spring",
                    }}
                >
                    <CheckCircle
                        size={72}
                        strokeWidth={1.5}
                    />
                </motion.div>

                <h1 className="fw-bold mb-3">
                    Order Placed Successfully
                </h1>

                <p className="text-muted mb-4">
                    Thank you for shopping with SneakX.
                </p>

                {order && (
                    <motion.div
                        className="card border-0 shadow-sm mx-auto mb-4"
                        style={{ maxWidth: "500px" }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Order ID
                                </span>

                                <strong>
                                    {order.id}
                                </strong>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Payment
                                </span>

                                <strong>
                                    {order.paymentMethod}
                                </strong>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span className="text-muted">
                                    Total
                                </span>

                                <strong>
                                    ₹
                                    {order.total.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>

                        </div>
                    </motion.div>
                )}

                {/* Actions */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Link
                            to="/orders"
                            className="btn btn-dark d-flex align-items-center justify-content-center gap-2"
                        >
                            <Package size={18} />
                            View My Orders
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Link
                            to="/products"
                            className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2"
                        >
                            <ShoppingBag size={18} />
                            Continue Shopping
                            <ArrowRight size={17} />
                        </Link>
                    </motion.div>

                </div>

            </motion.div>
        </div>
    );
}

export default OrderConfirmation;