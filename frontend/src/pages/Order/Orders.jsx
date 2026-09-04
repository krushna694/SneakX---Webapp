import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Package,
    CalendarDays,
    CreditCard,
    MapPin,
    ArrowRight,
    ShoppingBag,
    Receipt,
} from "lucide-react";

import { useOrder } from "../../features/order/hooks/useOrder";

function Orders() {
    const { orders } = useOrder();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (orders.length === 0) {
        return (
            <div className="container py-5">
                <motion.div
                    className="text-center py-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.4,
                            type: "spring",
                        }}
                    >
                        <Package
                            size={65}
                            strokeWidth={1.4}
                            className="mb-4"
                        />
                    </motion.div>

                    <h2 className="fw-bold mb-3">
                        No Orders Yet
                    </h2>

                    <p className="text-muted mb-4">
                        You haven't placed any orders yet.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="d-inline-block"
                    >
                        <Link
                            to="/products"
                            className="btn btn-dark d-flex align-items-center gap-2"
                        >
                            <ShoppingBag size={18} />
                            Start Shopping
                            <ArrowRight size={17} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            {/* Header */}
            <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="d-flex align-items-center gap-2 mb-2">
                    <Package size={26} />

                    <h1 className="fw-bold mb-0">
                        My Orders
                    </h1>
                </div>

                <p className="text-muted mb-0">
                    View and manage your recent orders.
                </p>
            </motion.div>

            {/* Orders */}
            <div className="d-flex flex-column gap-4">

                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        className="card border-0 shadow-sm"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            y: -3,
                        }}
                    >
                        <div className="card-body p-4">

                            {/* Order Header */}
                            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Receipt size={19} />

                                        <span className="text-muted">
                                            Order ID
                                        </span>
                                    </div>

                                    <h5 className="fw-bold mb-0">
                                        {order.id}
                                    </h5>
                                </div>

                                <div className="text-md-end">

                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <CalendarDays size={17} />

                                        <span className="text-muted">
                                            Order Date
                                        </span>
                                    </div>

                                    <span className="fw-medium">
                                        {formatDate(order.createdAt)}
                                    </span>

                                </div>

                            </div>

                            <hr />

                            {/* Order Information */}
                            <div className="row g-4 my-1">

                                {/* Status */}
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Package size={18} />

                                        <span className="text-muted">
                                            Status
                                        </span>
                                    </div>

                                    <span className="badge text-bg-dark">
                                        {order.status}
                                    </span>
                                </div>

                                {/* Payment */}
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <CreditCard size={18} />

                                        <span className="text-muted">
                                            Payment
                                        </span>
                                    </div>

                                    <span className="fw-medium">
                                        {order.paymentMethod}
                                    </span>
                                </div>

                                {/* Total */}
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Receipt size={18} />

                                        <span className="text-muted">
                                            Total
                                        </span>
                                    </div>

                                    <span className="fw-bold">
                                        ₹
                                        {order.total.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                            </div>

                            <hr />

                            {/* Products */}
                            <div className="mb-4">

                                <h6 className="fw-semibold mb-3">
                                    Products
                                </h6>

                                <div className="d-flex flex-column gap-3">

                                    {order.items.map((item) => (
                                        <div
                                            key={`${item.product.id}-${item.size}`}
                                            className="d-flex justify-content-between align-items-center gap-3"
                                        >
                                            <div>
                                                <p className="fw-medium mb-1">
                                                    {item.product.name}
                                                </p>

                                                <small className="text-muted">
                                                    Size {item.size} ×{" "}
                                                    {item.quantity}
                                                </small>
                                            </div>

                                            <span className="fw-medium">
                                                ₹
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* Bottom Section */}
                            <div className="row g-4">

                                {/* Address */}
                                <div className="col-md-7">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <MapPin size={18} />

                                        <span className="text-muted">
                                            Delivery Address
                                        </span>
                                    </div>

                                    <p className="fw-semibold mb-1">
                                        {order.address.fullName}
                                    </p>

                                    <p className="text-muted small mb-1">
                                        {order.address.addressLine}
                                    </p>

                                    <p className="text-muted small mb-1">
                                        {order.address.city},{" "}
                                        {order.address.state}{" "}
                                        {order.address.pincode}
                                    </p>

                                    <p className="text-muted small mb-0">
                                        {order.address.phone}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="col-md-5">

                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">
                                            Subtotal
                                        </span>

                                        <span>
                                            ₹
                                            {order.subtotal.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted">
                                            Delivery
                                        </span>

                                        <span>
                                            ₹
                                            {order.shipping.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="fw-bold">
                                            Total
                                        </span>

                                        <span className="fw-bold">
                                            ₹
                                            {order.total.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        View Details
                                        <ArrowRight size={17} />
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    );
}

export default Orders;