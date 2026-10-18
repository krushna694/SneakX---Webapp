
import { useEffect, useState } from "react";
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
import { useAddress } from "../../features/address/hooks/useAddress";
import OrderStatusTimeline from "../../features/order/components/OrderStatusTimeline";

function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const {
        getOrderById,
        cancelOrder,
        loading: ordersLoading,
        error: ordersError,
    } = useOrder();

    const {
        loading: addressesLoading,
        getAddressById,
    } = useAddress();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [cancelError, setCancelError] = useState(null);
    const [cancelMessage, setCancelMessage] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadOrder = async () => {
            if (!orderId) {
                if (mounted) {
                    setOrder(null);
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const result = await getOrderById(orderId);

                if (mounted) {
                    setOrder(result || null);

                    if (!result) {
                        setError("Unable to find this order. Please try again.");
                    }
                }
            } catch (err) {
                console.error("Failed to load order:", err);

                if (mounted) {
                    setOrder(null);
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to load this order."
                    );
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadOrder();

        return () => {
            mounted = false;
        };
    }, [orderId, getOrderById]);
    const handleCancelOrder = async () => {
        if (!order || cancelling) {
            return;
        }

        setCancelling(true);
        setCancelError(null);
        setCancelMessage(null);

        try {
            const success = await cancelOrder(order.id);

            if (!success) {
                setCancelError(
                    "Unable to cancel this order. Please try again."
                );
                setShowCancelModal(false);
                return;
            }

            const updatedOrder = await getOrderById(order.id);

            if (updatedOrder?.status === "CANCELLED") {
                setOrder(updatedOrder);
                setCancelMessage(
                    "Your order was cancelled successfully."
                );
            } else {
                setCancelError(
                    "Cancellation could not be confirmed. Please refresh the page."
                );
            }

            setShowCancelModal(false);
        } catch (err) {
            setCancelError(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Failed to cancel the order. Please try again."
            );

            setShowCancelModal(false);
        } finally {
            setCancelling(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Date unavailable";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatCurrency = (amount) => {
        const value = Number(amount ?? 0);

        return `₹${value.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const formatStatus = (status) => {
        if (!status) return "UNAVAILABLE";

        return String(status)
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (character) => character.toUpperCase());
    };

    if (loading || ordersLoading) {
        return (
            <div
                className="container py-5 d-flex align-items-center justify-content-center"
                style={{ minHeight: "60vh" }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div
                        className="spinner-border"
                        role="status"
                        style={{ width: "2rem", height: "2rem" }}
                    />

                    <p
                        className="text-muted mt-3 mb-0"
                        style={{ fontSize: "12px" }}
                    >
                        Loading order details...
                    </p>
                </motion.div>
            </div>
        );
    }

    if (!order) {
        const message =
            error ||
            ordersError ||
            "The order you're looking for doesn't exist or is no longer available.";

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
                        <Package size={38} strokeWidth={1.4} />
                    </div>

                    <h2 className="fw-bold mb-3">Order Not Found</h2>

                    <p
                        className="text-muted mb-4"
                        style={{ maxWidth: "420px", margin: "0 auto" }}
                    >
                        {message}
                    </p>

                    <Link
                        to="/orders"
                        className="btn btn-dark d-inline-flex align-items-center gap-2 px-4 py-2"
                        style={{ borderRadius: "10px" }}
                    >
                        <ArrowLeft size={18} />
                        Back to My Orders
                    </Link>
                </motion.div>
            </div>
        );
    }

    /*
     * The backend returns addressId rather than a complete address object.
     * Prefer an address snapshot if one exists; otherwise resolve the saved
     * address from AddressProvider.
     */
    const savedAddress = order.addressId != null
        ? getAddressById?.(order.addressId)
        : null;

    const address = order.address || savedAddress || null;

    const items = Array.isArray(order.items) ? order.items : [];

    const subtotal = Number(order.subtotal ?? 0);
    const discountAmount = Number(order.discountAmount ?? 0);
    const shipping = Number(order.shipping ?? order.shippingAmount ?? 0);
    const taxAmount = Number(order.taxAmount ?? 0);
    const total = Number(order.total ?? order.totalAmount ?? 0);

    const paymentStatus = order.paymentStatus || "PENDING";
    const isCancelled = order.status === "CANCELLED";

    const canCancelOrder =
        ["PENDING", "CONFIRMED"].includes(order.status) &&
        !["PAID", "SUCCESS", "PROCESSING"].includes(paymentStatus);

    return (
        <div className="container py-5" style={{ maxWidth: "1180px" }}>
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
                    style={{ fontSize: "13px", fontWeight: "600" }}
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

                        <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                            Order ID:{" "}
                            <strong className="text-dark">
                                {order.orderNumber || order.id || orderId}
                            </strong>
                        </p>
                    </div>

                    <div
                        className="d-inline-flex align-items-center gap-2 px-3 py-2"
                        style={{
                            borderRadius: "30px",
                            background: isCancelled ? "#fff1f1" : "#fff4ee",
                            color: isCancelled ? "#c94b4b" : "#ff5a1f",
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
                        {formatStatus(order.status)}
                    </div>
                </div>
            </motion.div>

            <div className="row g-4">
                {/* LEFT SIDE */}
                <div className="col-lg-8">
                    {/* ORDER STATUS */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            borderRadius: "20px",
                            background: "#ffffff",
                            border: "1px solid #eeeeee",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.045)",
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
                                    <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                                        Order Status
                                    </h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                                        Track the progress of your order.
                                    </p>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div
                                        className="p-3"
                                        style={{ borderRadius: "13px", background: "#fafafa" }}
                                    >
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <CalendarDays size={16} className="text-muted" />
                                            <span className="text-muted" style={{ fontSize: "11px" }}>
                                                Order Date
                                            </span>
                                        </div>
                                        <strong style={{ fontSize: "13px" }}>
                                            {formatDate(order.createdAt)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div
                                        className="p-3"
                                        style={{ borderRadius: "13px", background: "#fafafa" }}
                                    >
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <CreditCard size={16} className="text-muted" />
                                            <span className="text-muted" style={{ fontSize: "11px" }}>
                                                Payment Status
                                            </span>
                                        </div>
                                        <strong style={{ fontSize: "13px" }}>
                                            {formatStatus(paymentStatus)}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ORDER TRACKING */}
                    {!isCancelled && (
                        <motion.div
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                        >
                            <OrderStatusTimeline currentStatus={order.status} />
                        </motion.div>
                    )}

                    {/* CANCELLED MESSAGE */}
                    {isCancelled && (
                        <motion.div
                            className="mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                borderRadius: "20px",
                                background: "#ffffff",
                                border: "1px solid #f0d8d8",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
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
                                        <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                                            Order Cancelled
                                        </h5>
                                        <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                                            This order is marked as cancelled.
                                        </p>
                                    </div>
                                </div>

                                {order.cancelledAt && (
                                    <div
                                        className="pt-3 mt-3"
                                        style={{ borderTop: "1px solid #eeeeee" }}
                                    >
                                        <small className="text-muted" style={{ fontSize: "10px" }}>
                                            Cancelled on{" "}
                                            <strong>{formatDate(order.cancelledAt)}</strong>
                                        </small>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* DELIVERY ADDRESS */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.12 }}
                        style={{
                            borderRadius: "20px",
                            background: "#ffffff",
                            border: "1px solid #eeeeee",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.045)",
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
                                    <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                                        Delivery Address
                                    </h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                                        Your order's delivery destination.
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
                                {addressesLoading && !address ? (
                                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                                        Loading delivery address...
                                    </p>
                                ) : address ? (
                                    <>
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <strong style={{ fontSize: "13px" }}>
                                                {address.label || address.addressType || "Delivery Address"}
                                            </strong>

                                            {(address.isDefault ?? address.defaultAddress) && (
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

                                        <p className="fw-semibold mb-1" style={{ fontSize: "12px" }}>
                                            {address.fullName || address.name || ""}
                                        </p>

                                        <p
                                            className="text-muted mb-1"
                                            style={{ fontSize: "11px", lineHeight: "1.7" }}
                                        >
                                            {address.addressLine ||
                                                address.addressLine1 ||
                                                address.street ||
                                                ""}
                                            {address.addressLine2
                                                ? `, ${address.addressLine2}`
                                                : ""}
                                        </p>

                                        <p className="text-muted mb-1" style={{ fontSize: "11px" }}>
                                            {[
                                                address.city,
                                                address.state,
                                                address.pincode || address.postalCode,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>

                                        {(address.phone || address.phoneNumber) && (
                                            <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                                                Phone: {address.phone || address.phoneNumber}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <strong style={{ fontSize: "13px" }}>
                                            Delivery address unavailable
                                        </strong>
                                        <p
                                            className="text-muted mb-0 mt-2"
                                            style={{ fontSize: "11px", lineHeight: "1.7" }}
                                        >
                                            {order.addressId != null
                                                ? `Saved address details could not be loaded (address ID: ${order.addressId}).`
                                                : "This order does not contain a delivery address reference."}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* ORDERED PRODUCTS */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.18 }}
                        style={{
                            borderRadius: "20px",
                            background: "#ffffff",
                            border: "1px solid #eeeeee",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.045)",
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
                                    <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                                        Ordered Products
                                    </h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                                        {items.length} {items.length === 1 ? "item" : "items"} in this order.
                                    </p>
                                </div>
                            </div>

                            {items.length === 0 ? (
                                <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                                    No product details are available for this order.
                                </p>
                            ) : (
                                <div className="d-flex flex-column gap-3">
                                    {items.map((item, index) => {
                                        const product = item.product || {};
                                        const productName =
                                            item.productName ||
                                            product.name ||
                                            "Product";

                                        const quantity = Number(item.quantity ?? 0);
                                        const unitPrice = Number(
                                            item.unitPrice ?? product.price ?? 0
                                        );

                                        // Prefer the backend's saved line total.
                                        const lineTotal =
                                            item.totalPrice != null
                                                ? Number(item.totalPrice)
                                                : unitPrice * quantity;

                                        const imageUrl =
                                            item.imageUrl || product.image || null;

                                        return (
                                            <motion.div
                                                key={
                                                    item.id ??
                                                    item.orderItemId ??
                                                    `${item.productId ?? product.id ?? index}-${item.variantId ?? ""}-${item.size ?? ""}`
                                                }
                                                className="p-3"
                                                whileHover={{ y: -2 }}
                                                transition={{ duration: 0.2 }}
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
                                                                background: "#f0f0f0",
                                                                overflow: "hidden",
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {imageUrl ? (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={productName}
                                                                    onError={(event) => {
                                                                        event.currentTarget.style.display = "none";
                                                                    }}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
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
                                                                style={{ fontSize: "13px" }}
                                                            >
                                                                {productName}
                                                            </h6>

                                                            <div className="d-flex flex-wrap gap-3">
                                                                <small
                                                                    className="text-muted"
                                                                    style={{ fontSize: "10px" }}
                                                                >
                                                                    Size: {item.size || "N/A"}
                                                                </small>

                                                                <small
                                                                    className="text-muted"
                                                                    style={{ fontSize: "10px" }}
                                                                >
                                                                    Qty: {quantity}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-end">
                                                        <small
                                                            className="text-muted d-block mb-1"
                                                            style={{ fontSize: "9px" }}
                                                        >
                                                            {formatCurrency(unitPrice)} each
                                                        </small>

                                                        <strong style={{ fontSize: "13px" }}>
                                                            {formatCurrency(lineTotal)}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-lg-4">
                    <motion.div
                        className="sticky-top"
                        style={{ top: "90px" }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div
                            style={{
                                borderRadius: "20px",
                                background: "#ffffff",
                                border: "1px solid #eeeeee",
                                boxShadow: "0 10px 35px rgba(0,0,0,0.055)",
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
                                        <h5 className="fw-bold mb-1" style={{ fontSize: "16px" }}>
                                            Order Summary
                                        </h5>
                                        <p className="text-muted mb-0" style={{ fontSize: "10px" }}>
                                            Payment breakdown
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted" style={{ fontSize: "12px" }}>
                                        Subtotal
                                    </span>
                                    <span style={{ fontSize: "12px" }}>
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted" style={{ fontSize: "12px" }}>
                                            Discount
                                        </span>
                                        <span
                                            className="text-success"
                                            style={{ fontSize: "12px" }}
                                        >
                                            -{formatCurrency(discountAmount)}
                                        </span>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted" style={{ fontSize: "12px" }}>
                                        Delivery
                                    </span>
                                    <span style={{ fontSize: "12px" }}>
                                        {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                                    </span>
                                </div>

                                {taxAmount > 0 && (
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted" style={{ fontSize: "12px" }}>
                                            Tax
                                        </span>
                                        <span style={{ fontSize: "12px" }}>
                                            {formatCurrency(taxAmount)}
                                        </span>
                                    </div>
                                )}

                                <div
                                    className="my-3"
                                    style={{ height: "1px", background: "#eeeeee" }}
                                />

                                <div className="d-flex justify-content-between mb-4">
                                    <strong style={{ fontSize: "14px" }}>Total</strong>
                                    <strong style={{ fontSize: "18px" }}>
                                        {formatCurrency(total)}
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
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <span className="text-muted" style={{ fontSize: "10px" }}>
                                            Payment Status
                                        </span>
                                        <strong style={{ fontSize: "11px" }}>
                                            {formatStatus(paymentStatus)}
                                        </strong>
                                    </div>
                                </div>

                                {canCancelOrder && (
                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger w-100"
                                            onClick={() => {
                                                setCancelError(null);
                                                setCancelMessage(null);
                                                setShowCancelModal(true);
                                            }}
                                            disabled={cancelling}
                                            style={{
                                                borderRadius: "11px",
                                                padding: "11px",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {cancelling ? "Cancelling Order..." : "Cancel Order"}
                                        </button>
                                    </div>
                                )}

                                {cancelError && (
                                    <div className="alert alert-danger py-2" role="alert"
                                        style={{ fontSize: "12px" }}>
                                        {cancelError}
                                    </div>
                                )}

                                {cancelMessage && (
                                    <div className="alert alert-success py-2" role="status"
                                        style={{ fontSize: "12px" }}>
                                        {cancelMessage}
                                    </div>
                                )}

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

                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* CANCEL ORDER CONFIRMATION MODAL */}
            {showCancelModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                        zIndex: 2000,
                        background: "rgba(10, 10, 10, 0.58)",
                        backdropFilter: "blur(5px)",
                        padding: "20px",
                    }}
                    onClick={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !cancelling
                        ) {
                            setShowCancelModal(false);
                        }
                    }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cancel-order-title"
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-100"
                        style={{
                            maxWidth: "430px",
                            background: "#ffffff",
                            borderRadius: "22px",
                            padding: "28px",
                            boxShadow: "0 25px 80px rgba(0,0,0,0.22)",
                        }}
                    >
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn border-0 p-1"
                                aria-label="Close cancellation dialog"
                                disabled={cancelling}
                                onClick={() => setShowCancelModal(false)}
                                style={{
                                    color: "#777777",
                                    background: "#f5f5f5",
                                    borderRadius: "50%",
                                    width: "32px",
                                    height: "32px",
                                }}
                            >
                                <XCircle size={18} />
                            </button>
                        </div>

                        <div className="text-center px-1 pb-2">
                            <div
                                className="d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{
                                    width: "76px",
                                    height: "76px",
                                    borderRadius: "50%",
                                    background: "#fff0ed",
                                    color: "#ef4938",
                                }}
                            >
                                <XCircle size={38} strokeWidth={1.7} />
                            </div>

                            <h4
                                id="cancel-order-title"
                                className="fw-bold mb-2"
                                style={{
                                    color: "#171717",
                                    fontSize: "23px",
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                Cancel your order?
                            </h4>

                            <p
                                className="mb-4"
                                style={{
                                    color: "#777777",
                                    fontSize: "13px",
                                    lineHeight: "1.7",
                                }}
                            >
                                Are you sure you want to cancel this order?
                                This action cannot be undone.
                            </p>
                        </div>

                        <div
                            className="p-3 mb-3"
                            style={{
                                background: "#f8f8f8",
                                border: "1px solid #eeeeee",
                                borderRadius: "14px",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                <span
                                    style={{ color: "#777777", fontSize: "12px" }}
                                >
                                    Order ID
                                </span>

                                <strong
                                    className="text-end"
                                    style={{
                                        color: "#222222",
                                        fontSize: "12px",
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {order.orderNumber || order.id}
                                </strong>
                            </div>

                            <div className="d-flex justify-content-between align-items-center gap-3">
                                <span
                                    style={{ color: "#777777", fontSize: "12px" }}
                                >
                                    Payment status
                                </span>

                                <strong
                                    style={{
                                        color: "#b7791f",
                                        fontSize: "12px",
                                    }}
                                >
                                    {formatStatus(order.paymentStatus || "PENDING")}
                                </strong>
                            </div>
                        </div>

                        <p
                            className="mb-4"
                            style={{
                                color: "#888888",
                                fontSize: "11px",
                                lineHeight: "1.6",
                            }}
                        >
                            Your reserved stock will be released if the cancellation
                            succeeds. Any payment or refund questions may require
                            separate handling.
                        </p>

                        <div className="d-flex flex-column gap-2">
                            <button
                                type="button"
                                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                onClick={handleCancelOrder}
                                disabled={cancelling}
                                style={{
                                    background: "#ed4938",
                                    color: "#ffffff",
                                    border: "1px solid #ed4938",
                                    borderRadius: "12px",
                                    padding: "13px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                }}
                            >
                                {cancelling ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Cancelling Order...
                                    </>
                                ) : (
                                    "Yes, Cancel Order"
                                )}
                            </button>

                            <button
                                type="button"
                                className="btn w-100"
                                onClick={() => setShowCancelModal(false)}
                                disabled={cancelling}
                                style={{
                                    background: "#ffffff",
                                    color: "#222222",
                                    border: "1px solid #e5e5e5",
                                    borderRadius: "12px",
                                    padding: "13px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                }}
                            >
                                No, Keep My Order
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>


    );
}

export default OrderDetails;
