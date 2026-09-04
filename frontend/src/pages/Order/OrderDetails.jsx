import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CheckCircle,
    CreditCard,
    MapPin,
    Package,
    Receipt,
    ShoppingBag,
    XCircle,
} from "lucide-react";

import { useOrder } from "../../features/order/hooks/useOrder";
import OrderStatusTimeline from "../../features/order/components/OrderStatusTimeline";

function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const { orders, cancelOrder } = useOrder();

    const order = orders.find(
        (item) => String(item.id) === String(orderId)
    );

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const handleCancelOrder = () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        const cancelled = cancelOrder(order.id);

        if (cancelled) {
            navigate(`/orders/${order.id}`);
        }
    };

    if (!order) {
        return (
            <div className="container py-5">
                <motion.div
                    className="text-center py-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Package
                        size={65}
                        strokeWidth={1.4}
                        className="mb-4"
                    />

                    <h2 className="fw-bold mb-3">
                        Order Not Found
                    </h2>

                    <p className="text-muted mb-4">
                        The order you're looking for doesn't exist
                        or is no longer available.
                    </p>

                    <motion.div
                        className="d-inline-block"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Link
                            to="/orders"
                            className="btn btn-dark d-flex align-items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Back to My Orders
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    const canCancel =
        order.status === "PLACED" ||
        order.status === "CONFIRMED" ||
        order.status === "PROCESSING";

    return (
        <div className="container py-5">

            {/* Header */}
            <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <motion.button
                    type="button"
                    className="btn btn-link text-dark text-decoration-none p-0 mb-3 d-flex align-items-center gap-2"
                    onClick={() => navigate("/orders")}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ArrowLeft size={18} />
                    Back to My Orders
                </motion.button>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <Package size={25} />

                            <h1 className="fw-bold mb-0">
                                Order Details
                            </h1>
                        </div>

                        <p className="text-muted mb-0">
                            Order ID:{" "}
                            <strong className="text-dark">
                                {order.id}
                            </strong>
                        </p>
                    </div>

                    <span className="badge text-bg-dark fs-6 px-3 py-2">
                        {order.status}
                    </span>
                </div>
            </motion.div>

            <div className="row g-4">

                {/* LEFT SIDE */}
                <div className="col-lg-8">

                    {/* Order Status */}
                    <motion.div
                        className="card border-0 shadow-sm mb-4"
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <CheckCircle size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Order Status
                                </h5>
                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <CalendarDays size={18} />

                                        <span className="text-muted">
                                            Order Date
                                        </span>
                                    </div>

                                    <strong>
                                        {formatDate(order.createdAt)}
                                    </strong>
                                </div>

                                <div className="col-md-6">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <CreditCard size={18} />

                                        <span className="text-muted">
                                            Payment Method
                                        </span>
                                    </div>

                                    <strong>
                                        {order.paymentMethod}
                                    </strong>
                                </div>

                            </div>

                        </div>
                    </motion.div>

                    {/* Order Tracking */}
                    {order.status !== "CANCELLED" && (
                        <OrderStatusTimeline
                            currentStatus={order.status}
                        />
                    )}

                    {/* Cancelled Message */}
                    {order.status === "CANCELLED" && (
                        <motion.div
                            className="card border-0 shadow-sm mb-4"
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                        >
                            <div className="card-body p-4">

                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <XCircle size={22} />

                                    <h5 className="fw-semibold mb-0">
                                        Order Cancelled
                                    </h5>
                                </div>

                                <p className="text-muted mb-0">
                                    This order has been cancelled
                                    successfully.
                                </p>

                                {order.cancelledAt && (
                                    <small className="text-muted d-block mt-2">
                                        Cancelled on{" "}
                                        {formatDate(
                                            order.cancelledAt
                                        )}
                                    </small>
                                )}

                            </div>
                        </motion.div>
                    )}

                    {/* Delivery Address */}
                    <motion.div
                        className="card border-0 shadow-sm mb-4"
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1,
                        }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <MapPin size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Delivery Address
                                </h5>
                            </div>

                            <div className="border rounded p-3">

                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <strong>
                                        {order.address.label}
                                    </strong>

                                    {order.address.isDefault && (
                                        <span className="badge text-bg-dark">
                                            Default
                                        </span>
                                    )}
                                </div>

                                <p className="fw-semibold mb-1">
                                    {order.address.fullName}
                                </p>

                                <p className="text-muted mb-1">
                                    {order.address.addressLine}
                                </p>

                                <p className="text-muted mb-1">
                                    {order.address.city},{" "}
                                    {order.address.state}{" "}
                                    {order.address.pincode}
                                </p>

                                <p className="text-muted mb-0">
                                    Phone: {order.address.phone}
                                </p>

                            </div>

                        </div>
                    </motion.div>

                    {/* Products */}
                    <motion.div
                        className="card border-0 shadow-sm"
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.2,
                        }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <ShoppingBag size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Ordered Products
                                </h5>
                            </div>

                            <div className="d-flex flex-column gap-3">

                                {order.items.map((item) => (
                                    <motion.div
                                        key={`${item.product.id}-${item.size}`}
                                        className="border rounded p-3"
                                        whileHover={{
                                            y: -2,
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center gap-3">

                                            <div>
                                                <h6 className="fw-semibold mb-2">
                                                    {item.product.name}
                                                </h6>

                                                <div className="d-flex flex-wrap gap-3">
                                                    <small className="text-muted">
                                                        Size:{" "}
                                                        {item.size}
                                                    </small>

                                                    <small className="text-muted">
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </small>
                                                </div>
                                            </div>

                                            <div className="text-end">
                                                <small className="text-muted d-block mb-1">
                                                    ₹
                                                    {item.product.price.toLocaleString(
                                                        "en-IN"
                                                    )}{" "}
                                                    each
                                                </small>

                                                <strong>
                                                    ₹
                                                    {(
                                                        item.product
                                                            .price *
                                                        item.quantity
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </strong>
                                            </div>

                                        </div>
                                    </motion.div>
                                ))}

                            </div>

                        </div>
                    </motion.div>

                </div>

                {/* RIGHT SIDE */}
                <div className="col-lg-4">

                    <motion.div
                        className="card border-0 shadow-sm sticky-top"
                        style={{ top: "90px" }}
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <Receipt size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Order Summary
                                </h5>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
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
                                    {order.shipping === 0
                                        ? "FREE"
                                        : `₹${order.shipping.toLocaleString(
                                            "en-IN"
                                        )}`}
                                </span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-4">
                                <strong>
                                    Total
                                </strong>

                                <strong>
                                    ₹
                                    {order.total.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>

                            {/* Continue Shopping */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    to="/products"
                                    className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                >
                                    <ShoppingBag size={18} />
                                    Continue Shopping
                                    <ArrowRight size={17} />
                                </Link>
                            </motion.div>

                            {/* Cancel Order */}
                            {canCancel && (
                                <motion.button
                                    type="button"
                                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 mt-3"
                                    onClick={handleCancelOrder}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                >
                                    <XCircle size={18} />
                                    Cancel Order
                                </motion.button>
                            )}

                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
}

export default OrderDetails;