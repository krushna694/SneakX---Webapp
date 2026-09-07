import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
    X,
    XCircle,
} from "lucide-react";

import { useOrder } from "../../features/order/hooks/useOrder";
import OrderStatusTimeline from "../../features/order/components/OrderStatusTimeline";

function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const { orders, cancelOrder } = useOrder();

    const [showCancelModal, setShowCancelModal] = useState(false);

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

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const canCancel =
        order &&
        (order.status === "PLACED" ||
            order.status === "CONFIRMED" ||
            order.status === "PROCESSING");

    const handleCancelOrder = () => {
        if (!order) {
            return;
        }

        const cancelled = cancelOrder(order.id);

        if (cancelled) {
            setShowCancelModal(false);
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
                    <div
                        className="d-inline-flex align-items-center justify-content-center mb-4"
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "22px",
                            background: "#f5f5f5",
                        }}
                    >
                        <Package
                            size={38}
                            strokeWidth={1.4}
                        />
                    </div>

                    <h2 className="fw-bold mb-3">
                        Order Not Found
                    </h2>

                    <p
                        className="text-muted mb-4"
                        style={{ maxWidth: "420px", margin: "0 auto" }}
                    >
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
                            className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2"
                            style={{
                                borderRadius: "10px",
                            }}
                        >
                            <ArrowLeft size={18} />
                            Back to My Orders
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div
                className="container py-5"
                style={{ maxWidth: "1180px" }}
            >
                {/* HEADER */}
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
                        style={{
                            fontSize: "13px",
                            fontWeight: "600",
                        }}
                    >
                        <ArrowLeft size={17} />
                        Back to My Orders
                    </motion.button>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
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
                                    <Package size={20} />
                                </div>

                                <div>
                                    <p
                                        className="text-uppercase mb-1"
                                        style={{
                                            fontSize: "9px",
                                            letterSpacing: "1.6px",
                                            color: "#999999",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Order Information
                                    </p>

                                    <h1
                                        className="fw-bold mb-0"
                                        style={{ fontSize: "26px" }}
                                    >
                                        Order Details
                                    </h1>
                                </div>
                            </div>

                            <p
                                className="text-muted mb-0"
                                style={{ fontSize: "13px" }}
                            >
                                Order ID:{" "}
                                <strong className="text-dark">
                                    {order.id}
                                </strong>
                            </p>
                        </div>

                        <div
                            className="d-inline-flex align-items-center gap-2 px-3 py-2"
                            style={{
                                borderRadius: "30px",
                                background:
                                    order.status === "CANCELLED"
                                        ? "#fff1f1"
                                        : "#fff4ee",
                                color:
                                    order.status === "CANCELLED"
                                        ? "#c94b4b"
                                        : "#ff5a1f",
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "0.3px",
                            }}
                        >
                            <span
                                style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: "currentColor",
                                }}
                            />
                            {order.status}
                        </div>
                    </div>
                </motion.div>

                <div className="row g-4">
                    {/* LEFT SIDE */}
                    <div className="col-lg-8">

                        {/* ORDER STATUS */}
                        <motion.div
                            className="mb-4"
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
                            style={{
                                borderRadius: "20px",
                                background: "#ffffff",
                                border: "1px solid #eeeeee",
                                boxShadow:
                                    "0 8px 30px rgba(0,0,0,0.045)",
                            }}
                        >
                            <div className="p-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "11px",
                                            background: "#f5f5f5",
                                        }}
                                    >
                                        <CheckCircle size={19} />
                                    </div>

                                    <div>
                                        <h5
                                            className="fw-bold mb-1"
                                            style={{ fontSize: "16px" }}
                                        >
                                            Order Status
                                        </h5>

                                        <p
                                            className="text-muted mb-0"
                                            style={{ fontSize: "11px" }}
                                        >
                                            Track the progress of your order.
                                        </p>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div
                                            className="p-3"
                                            style={{
                                                borderRadius: "13px",
                                                background: "#fafafa",
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <CalendarDays
                                                    size={16}
                                                    className="text-muted"
                                                />

                                                <span
                                                    className="text-muted"
                                                    style={{
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    Order Date
                                                </span>
                                            </div>

                                            <strong
                                                style={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div
                                            className="p-3"
                                            style={{
                                                borderRadius: "13px",
                                                background: "#fafafa",
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <CreditCard
                                                    size={16}
                                                    className="text-muted"
                                                />

                                                <span
                                                    className="text-muted"
                                                    style={{
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    Payment Method
                                                </span>
                                            </div>

                                            <strong
                                                style={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {order.paymentMethod}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ORDER TRACKING */}
                        {order.status !== "CANCELLED" && (
                            <motion.div
                                className="mb-4"
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
                                    delay: 0.08,
                                }}
                            >
                                <OrderStatusTimeline
                                    currentStatus={order.status}
                                />
                            </motion.div>
                        )}

                        {/* CANCELLED MESSAGE */}
                        {order.status === "CANCELLED" && (
                            <motion.div
                                className="mb-4"
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
                                style={{
                                    borderRadius: "20px",
                                    background: "#ffffff",
                                    border: "1px solid #f0d8d8",
                                    boxShadow:
                                        "0 8px 30px rgba(0,0,0,0.04)",
                                }}
                            >
                                <div className="p-4">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "12px",
                                                background: "#fff1f1",
                                                color: "#c94b4b",
                                            }}
                                        >
                                            <XCircle size={20} />
                                        </div>

                                        <div>
                                            <h5
                                                className="fw-bold mb-1"
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Order Cancelled
                                            </h5>

                                            <p
                                                className="text-muted mb-0"
                                                style={{
                                                    fontSize: "11px",
                                                }}
                                            >
                                                This order has been
                                                cancelled successfully.
                                            </p>
                                        </div>
                                    </div>

                                    {order.cancelledAt && (
                                        <div
                                            className="pt-3 mt-3"
                                            style={{
                                                borderTop:
                                                    "1px solid #eeeeee",
                                            }}
                                        >
                                            <small
                                                className="text-muted"
                                                style={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                Cancelled on{" "}
                                                <strong>
                                                    {formatDate(
                                                        order.cancelledAt
                                                    )}
                                                </strong>
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* DELIVERY ADDRESS */}
                        <motion.div
                            className="mb-4"
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
                                delay: 0.12,
                            }}
                            style={{
                                borderRadius: "20px",
                                background: "#ffffff",
                                border: "1px solid #eeeeee",
                                boxShadow:
                                    "0 8px 30px rgba(0,0,0,0.045)",
                            }}
                        >
                            <div className="p-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "11px",
                                            background: "#f5f5f5",
                                        }}
                                    >
                                        <MapPin size={19} />
                                    </div>

                                    <div>
                                        <h5
                                            className="fw-bold mb-1"
                                            style={{ fontSize: "16px" }}
                                        >
                                            Delivery Address
                                        </h5>

                                        <p
                                            className="text-muted mb-0"
                                            style={{ fontSize: "11px" }}
                                        >
                                            Your order will be delivered here.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="p-3"
                                    style={{
                                        borderRadius: "14px",
                                        background: "#fafafa",
                                        border: "1px solid #eeeeee",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <strong
                                            style={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            {order.address.label}
                                        </strong>

                                        {order.address.isDefault && (
                                            <span
                                                style={{
                                                    padding: "4px 8px",
                                                    borderRadius: "20px",
                                                    background: "#111111",
                                                    color: "#ffffff",
                                                    fontSize: "8px",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                DEFAULT
                                            </span>
                                        )}
                                    </div>

                                    <p
                                        className="fw-semibold mb-1"
                                        style={{ fontSize: "12px" }}
                                    >
                                        {order.address.fullName}
                                    </p>

                                    <p
                                        className="text-muted mb-1"
                                        style={{
                                            fontSize: "11px",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        {order.address.addressLine}
                                    </p>

                                    <p
                                        className="text-muted mb-1"
                                        style={{ fontSize: "11px" }}
                                    >
                                        {order.address.city},{" "}
                                        {order.address.state}{" "}
                                        {order.address.pincode}
                                    </p>

                                    <p
                                        className="text-muted mb-0"
                                        style={{ fontSize: "11px" }}
                                    >
                                        Phone: {order.address.phone}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* ORDERED PRODUCTS */}
                        <motion.div
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
                                delay: 0.18,
                            }}
                            style={{
                                borderRadius: "20px",
                                background: "#ffffff",
                                border: "1px solid #eeeeee",
                                boxShadow:
                                    "0 8px 30px rgba(0,0,0,0.045)",
                            }}
                        >
                            <div className="p-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "11px",
                                            background: "#f5f5f5",
                                        }}
                                    >
                                        <ShoppingBag size={19} />
                                    </div>

                                    <div>
                                        <h5
                                            className="fw-bold mb-1"
                                            style={{ fontSize: "16px" }}
                                        >
                                            Ordered Products
                                        </h5>

                                        <p
                                            className="text-muted mb-0"
                                            style={{ fontSize: "11px" }}
                                        >
                                            {order.items.length}{" "}
                                            {order.items.length === 1
                                                ? "item"
                                                : "items"}{" "}
                                            in this order.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    {order.items.map((item) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.size}`}
                                            className="p-3"
                                            whileHover={{ y: -2 }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            style={{
                                                borderRadius: "15px",
                                                background: "#fafafa",
                                                border: "1px solid #eeeeee",
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center gap-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "62px",
                                                            height: "62px",
                                                            borderRadius: "12px",
                                                            background:
                                                                "#f0f0f0",
                                                            overflow: "hidden",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {item.product.image ? (
                                                            <img
                                                                src={
                                                                    item.product
                                                                        .image
                                                                }
                                                                alt={
                                                                    item.product
                                                                        .name
                                                                }
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                        ) : (
                                                            <Package
                                                                size={24}
                                                                className="text-muted"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h6
                                                            className="fw-bold mb-2"
                                                            style={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {
                                                                item.product
                                                                    .name
                                                            }
                                                        </h6>

                                                        <div className="d-flex flex-wrap gap-3">
                                                            <small
                                                                className="text-muted"
                                                                style={{
                                                                    fontSize:
                                                                        "10px",
                                                                }}
                                                            >
                                                                Size:{" "}
                                                                {item.size}
                                                            </small>

                                                            <small
                                                                className="text-muted"
                                                                style={{
                                                                    fontSize:
                                                                        "10px",
                                                                }}
                                                            >
                                                                Qty:{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <small
                                                        className="text-muted d-block mb-1"
                                                        style={{
                                                            fontSize: "9px",
                                                        }}
                                                    >
                                                        {formatCurrency(
                                                            item.product.price
                                                        )}{" "}
                                                        each
                                                    </small>

                                                    <strong
                                                        style={{
                                                            fontSize: "13px",
                                                        }}
                                                    >
                                                        {formatCurrency(
                                                            item.product.price *
                                                            item.quantity
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
                            className="sticky-top"
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
                            <div
                                style={{
                                    borderRadius: "20px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                    boxShadow:
                                        "0 10px 35px rgba(0,0,0,0.055)",
                                }}
                            >
                                <div className="p-4">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "11px",
                                                background: "#111111",
                                                color: "#ffffff",
                                            }}
                                        >
                                            <Receipt size={19} />
                                        </div>

                                        <div>
                                            <h5
                                                className="fw-bold mb-1"
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Order Summary
                                            </h5>

                                            <p
                                                className="text-muted mb-0"
                                                style={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                Payment breakdown
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            Subtotal
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            {formatCurrency(
                                                order.subtotal
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            Delivery
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            {order.shipping === 0
                                                ? "FREE"
                                                : formatCurrency(
                                                    order.shipping
                                                )}
                                        </span>
                                    </div>

                                    <div
                                        className="my-3"
                                        style={{
                                            height: "1px",
                                            background: "#eeeeee",
                                        }}
                                    />

                                    <div className="d-flex justify-content-between mb-4">
                                        <strong
                                            style={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            Total
                                        </strong>

                                        <strong
                                            style={{
                                                fontSize: "18px",
                                            }}
                                        >
                                            {formatCurrency(order.total)}
                                        </strong>
                                    </div>

                                    <div
                                        className="p-3 mb-3"
                                        style={{
                                            borderRadius: "12px",
                                            background: "#fafafa",
                                            border: "1px solid #eeeeee",
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span
                                                className="text-muted"
                                                style={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                Payment Method
                                            </span>

                                            <strong
                                                style={{
                                                    fontSize: "11px",
                                                }}
                                            >
                                                {order.paymentMethod}
                                            </strong>
                                        </div>
                                    </div>

                                    {/* CONTINUE SHOPPING */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Link
                                            to="/products"
                                            className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                borderRadius: "11px",
                                                padding: "11px",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            <ShoppingBag size={16} />
                                            Continue Shopping
                                            <ArrowRight size={15} />
                                        </Link>
                                    </motion.div>

                                    {/* CANCEL ORDER */}
                                    {canCancel && (
                                        <motion.button
                                            type="button"
                                            className="btn w-100 d-flex align-items-center justify-content-center gap-2 mt-3"
                                            onClick={() =>
                                                setShowCancelModal(true)
                                            }
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            style={{
                                                border: "1px solid #f0cccc",
                                                background: "#fffafa",
                                                color: "#c94b4b",
                                                borderRadius: "11px",
                                                padding: "10px",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            <XCircle size={16} />
                                            Cancel Order
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CANCEL CONFIRMATION MODAL */}
            <AnimatePresence>
                {showCancelModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() =>
                            setShowCancelModal(false)
                        }
                        style={{
                            zIndex: 2000,
                            background:
                                "rgba(0, 0, 0, 0.48)",
                            backdropFilter: "blur(8px)",
                            padding: "20px",
                        }}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="cancel-order-title"
                            className="position-relative"
                            initial={{
                                opacity: 0,
                                scale: 0.92,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.94,
                                y: 15,
                            }}
                            transition={{
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            style={{
                                width: "min(460px, 100%)",
                                borderRadius: "22px",
                                background: "#ffffff",
                                boxShadow:
                                    "0 25px 80px rgba(0,0,0,0.2)",
                                overflow: "hidden",
                            }}
                        >
                            {/* Top accent */}
                            <div
                                style={{
                                    height: "4px",
                                    background: "#c94b4b",
                                }}
                            />

                            <div className="p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "15px",
                                            background: "#fff1f1",
                                            color: "#c94b4b",
                                        }}
                                    >
                                        <XCircle size={26} />
                                    </div>

                                    <motion.button
                                        type="button"
                                        className="btn d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                            setShowCancelModal(false)
                                        }
                                        whileHover={{
                                            background: "#f5f5f5",
                                        }}
                                        whileTap={{
                                            scale: 0.94,
                                        }}
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                            padding: 0,
                                            borderRadius: "10px",
                                            color: "#777777",
                                        }}
                                    >
                                        <X size={18} />
                                    </motion.button>
                                </div>

                                <h4
                                    id="cancel-order-title"
                                    className="fw-bold mb-2"
                                    style={{ fontSize: "20px" }}
                                >
                                    Cancel this order?
                                </h4>

                                <p
                                    className="text-muted mb-4"
                                    style={{
                                        fontSize: "12px",
                                        lineHeight: "1.7",
                                    }}
                                >
                                    Are you sure you want to cancel this
                                    order? This action cannot be undone.
                                </p>

                                <div
                                    className="p-3 mb-4"
                                    style={{
                                        borderRadius: "13px",
                                        background: "#fafafa",
                                        border: "1px solid #eeeeee",
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span
                                            className="text-muted"
                                            style={{
                                                fontSize: "10px",
                                            }}
                                        >
                                            Order ID
                                        </span>

                                        <strong
                                            style={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            {order.id}
                                        </strong>
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-sm-row gap-2">
                                    <motion.button
                                        type="button"
                                        className="btn flex-fill"
                                        onClick={() =>
                                            setShowCancelModal(false)
                                        }
                                        whileHover={{
                                            background: "#f5f5f5",
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        style={{
                                            border: "1px solid #e5e5e5",
                                            background: "#ffffff",
                                            color: "#333333",
                                            borderRadius: "11px",
                                            padding: "11px",
                                            fontSize: "11px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Keep Order
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        className="btn flex-fill"
                                        onClick={handleCancelOrder}
                                        whileHover={{
                                            background: "#b83f3f",
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        style={{
                                            border: "1px solid #c94b4b",
                                            background: "#c94b4b",
                                            color: "#ffffff",
                                            borderRadius: "11px",
                                            padding: "11px",
                                            fontSize: "11px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Cancel Order
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default OrderDetails;