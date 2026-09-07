import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Clock3,
    CreditCard,
    MapPin,
    Package,
    ShoppingBag,
    Truck,
} from "lucide-react";

function OrderConfirmation() {
    const location = useLocation();

    const order = location.state?.order;

    const formatCurrency = (amount) =>
        Number(amount || 0).toLocaleString("en-IN");

    const paymentLabel =
        order?.paymentMethod === "COD"
            ? "Cash on Delivery"
            : order?.paymentMethod === "ONLINE"
                ? "Online Payment"
                : order?.paymentMethod || "Payment";

    if (!order) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#fafafa",
                }}
            >
                <div className="container py-5">
                    <motion.div
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.45,
                        }}
                        style={{
                            minHeight: "65vh",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center mb-4"
                            style={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "22px",
                                background: "#f5f5f5",
                                color: "#777777",
                            }}
                        >
                            <Package
                                size={32}
                                strokeWidth={1.5}
                            />
                        </div>

                        <p
                            className="text-uppercase mb-2"
                            style={{
                                fontSize: "8px",
                                letterSpacing: "1.7px",
                                color: "#999999",
                                fontWeight: "700",
                            }}
                        >
                            Order Information
                        </p>

                        <h2
                            className="fw-bold mb-2"
                            style={{
                                fontSize: "25px",
                                color: "#111111",
                            }}
                        >
                            Order details unavailable
                        </h2>

                        <p
                            className="mb-4"
                            style={{
                                maxWidth: "420px",
                                fontSize: "11px",
                                lineHeight: "1.7",
                                color: "#777777",
                            }}
                        >
                            This confirmation page was opened without
                            an order. Please visit your orders or
                            continue shopping.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <Link
                                to="/orders"
                                className="btn d-flex align-items-center justify-content-center gap-2"
                                style={{
                                    minHeight: "43px",
                                    padding: "0 18px",
                                    borderRadius: "10px",
                                    background: "#111111",
                                    color: "#ffffff",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                }}
                            >
                                <Package size={16} />
                                View My Orders
                            </Link>

                            <Link
                                to="/products"
                                className="btn d-flex align-items-center justify-content-center gap-2"
                                style={{
                                    minHeight: "43px",
                                    padding: "0 18px",
                                    borderRadius: "10px",
                                    border: "1px solid #dddddd",
                                    background: "#ffffff",
                                    color: "#333333",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                }}
                            >
                                Continue Shopping
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fafafa",
            }}
        >
            <div className="container py-4 py-md-5">

                {/* =================================================
                    SUCCESS HERO
                ================================================== */}

                <motion.div
                    className="text-center mb-5"
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    {/* Animated Check */}
                    <motion.div
                        className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.55,
                            type: "spring",
                            stiffness: 180,
                            damping: 14,
                        }}
                        style={{
                            width: "84px",
                            height: "84px",
                            borderRadius: "50%",
                            background: "#111111",
                            color: "#ffffff",
                            boxShadow:
                                "0 15px 40px rgba(0,0,0,0.14)",
                        }}
                    >
                        <motion.div
                            initial={{
                                scale: 0,
                                rotate: -20,
                            }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                            }}
                            transition={{
                                delay: 0.2,
                                duration: 0.35,
                            }}
                        >
                            <Check
                                size={38}
                                strokeWidth={2.4}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.p
                        className="text-uppercase mb-2"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.25,
                        }}
                        style={{
                            fontSize: "8px",
                            letterSpacing: "2px",
                            color: "#ff5a1f",
                            fontWeight: "800",
                        }}
                    >
                        Order Confirmed
                    </motion.p>

                    <h1
                        className="fw-bold mb-2"
                        style={{
                            fontSize:
                                "clamp(28px, 5vw, 42px)",
                            letterSpacing: "-1px",
                            color: "#111111",
                        }}
                    >
                        Your order is on its way.
                    </h1>

                    <p
                        className="mb-3"
                        style={{
                            color: "#777777",
                            fontSize: "12px",
                        }}
                    >
                        Thank you for choosing SneakX.
                        Your order has been placed successfully.
                    </p>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <span
                            style={{
                                fontSize: "10px",
                                color: "#999999",
                            }}
                        >
                            Order ID
                        </span>

                        <span
                            className="fw-bold"
                            style={{
                                fontSize: "11px",
                                color: "#111111",
                            }}
                        >
                            #{order.id}
                        </span>
                    </div>
                </motion.div>

                {/* =================================================
                    MAIN CONTENT
                ================================================== */}

                <div className="row g-4">

                    {/* LEFT */}
                    <div className="col-lg-8">

                        {/* Status Card */}
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
                                duration: 0.45,
                                delay: 0.1,
                            }}
                            style={{
                                borderRadius: "18px",
                                background: "#111111",
                                overflow: "hidden",
                                boxShadow:
                                    "0 15px 40px rgba(0,0,0,0.10)",
                            }}
                        >
                            <div className="p-4 p-md-5">

                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            borderRadius: "12px",
                                            background:
                                                "rgba(255,255,255,0.09)",
                                            color: "#ffffff",
                                        }}
                                    >
                                        <Truck size={19} />
                                    </div>

                                    <div>
                                        <p
                                            className="text-uppercase mb-1"
                                            style={{
                                                fontSize: "8px",
                                                letterSpacing:
                                                    "1.4px",
                                                color: "#888888",
                                                fontWeight:
                                                    "700",
                                            }}
                                        >
                                            Delivery Status
                                        </p>

                                        <h5
                                            className="fw-bold mb-0"
                                            style={{
                                                fontSize: "16px",
                                                color: "#ffffff",
                                            }}
                                        >
                                            Order Placed
                                        </h5>
                                    </div>
                                </div>

                                <div className="row g-3">

                                    {/* Step 1 */}
                                    <div className="col-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    borderRadius:
                                                        "50%",
                                                    background:
                                                        "#ffffff",
                                                    color:
                                                        "#111111",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Check
                                                    size={14}
                                                />
                                            </div>

                                            <div>
                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "9px",
                                                        color:
                                                            "#ffffff",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Placed
                                                </p>

                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "8px",
                                                        color:
                                                            "#777777",
                                                    }}
                                                >
                                                    Complete
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="col-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    borderRadius:
                                                        "50%",
                                                    border:
                                                        "1px solid #555555",
                                                    color:
                                                        "#777777",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Clock3
                                                    size={13}
                                                />
                                            </div>

                                            <div>
                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "9px",
                                                        color:
                                                            "#aaaaaa",
                                                        fontWeight:
                                                            "600",
                                                    }}
                                                >
                                                    Processing
                                                </p>

                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "8px",
                                                        color:
                                                            "#666666",
                                                    }}
                                                >
                                                    Upcoming
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="col-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    borderRadius:
                                                        "50%",
                                                    border:
                                                        "1px solid #555555",
                                                    color:
                                                        "#777777",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Truck
                                                    size={13}
                                                />
                                            </div>

                                            <div>
                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "9px",
                                                        color:
                                                            "#aaaaaa",
                                                        fontWeight:
                                                            "600",
                                                    }}
                                                >
                                                    Delivery
                                                </p>

                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        fontSize:
                                                            "8px",
                                                        color:
                                                            "#666666",
                                                    }}
                                                >
                                                    Upcoming
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Address */}
                        {order.address && (
                            <motion.div
                                className="mb-4"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.15,
                                }}
                                style={{
                                    borderRadius: "18px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                    boxShadow:
                                        "0 8px 30px rgba(0,0,0,0.045)",
                                }}
                            >
                                <div className="p-4 p-md-5">

                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius:
                                                    "12px",
                                                background:
                                                    "#fff1eb",
                                                color:
                                                    "#ff5a1f",
                                            }}
                                        >
                                            <MapPin size={19} />
                                        </div>

                                        <div>
                                            <p
                                                className="text-uppercase mb-1"
                                                style={{
                                                    fontSize:
                                                        "8px",
                                                    letterSpacing:
                                                        "1.4px",
                                                    color:
                                                        "#999999",
                                                    fontWeight:
                                                        "700",
                                                }}
                                            >
                                                Shipping
                                            </p>

                                            <h5
                                                className="fw-bold mb-0"
                                                style={{
                                                    fontSize:
                                                        "16px",
                                                    color:
                                                        "#111111",
                                                }}
                                            >
                                                Delivery Address
                                            </h5>
                                        </div>
                                    </div>

                                    <div
                                        className="p-3"
                                        style={{
                                            borderRadius:
                                                "12px",
                                            background:
                                                "#fafafa",
                                            border:
                                                "1px solid #eeeeee",
                                        }}
                                    >
                                        <h6
                                            className="fw-bold mb-2"
                                            style={{
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            {
                                                order.address
                                                    .fullName
                                            }
                                        </h6>

                                        <p
                                            className="mb-1"
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#666666",
                                                lineHeight:
                                                    "1.6",
                                            }}
                                        >
                                            {
                                                order.address
                                                    .addressLine
                                            }
                                        </p>

                                        <p
                                            className="mb-1"
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#666666",
                                            }}
                                        >
                                            {
                                                order.address
                                                    .city
                                            }
                                            ,{" "}
                                            {
                                                order.address
                                                    .state
                                            }{" "}
                                            —{" "}
                                            {
                                                order.address
                                                    .pincode
                                            }
                                        </p>

                                        <p
                                            className="mb-0"
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#666666",
                                            }}
                                        >
                                            +91{" "}
                                            {
                                                order.address
                                                    .phone
                                            }
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        )}

                        {/* Ordered Items */}
                        {order.items &&
                            order.items.length > 0 && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2,
                                    }}
                                    style={{
                                        borderRadius: "18px",
                                        background: "#ffffff",
                                        border: "1px solid #eeeeee",
                                        boxShadow:
                                            "0 8px 30px rgba(0,0,0,0.045)",
                                    }}
                                >
                                    <div className="p-4 p-md-5">

                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "42px",
                                                        height: "42px",
                                                        borderRadius:
                                                            "12px",
                                                        background:
                                                            "#f5f5f5",
                                                        color:
                                                            "#555555",
                                                    }}
                                                >
                                                    <ShoppingBag
                                                        size={19}
                                                    />
                                                </div>

                                                <div>
                                                    <p
                                                        className="text-uppercase mb-1"
                                                        style={{
                                                            fontSize:
                                                                "8px",
                                                            letterSpacing:
                                                                "1.4px",
                                                            color:
                                                                "#999999",
                                                            fontWeight:
                                                                "700",
                                                        }}
                                                    >
                                                        Purchase
                                                    </p>

                                                    <h5
                                                        className="fw-bold mb-0"
                                                        style={{
                                                            fontSize:
                                                                "16px",
                                                        }}
                                                    >
                                                        Items Ordered
                                                    </h5>
                                                </div>
                                            </div>

                                            <span
                                                style={{
                                                    fontSize:
                                                        "10px",
                                                    color:
                                                        "#999999",
                                                }}
                                            >
                                                {
                                                    order.items
                                                        .length
                                                }{" "}
                                                {order.items
                                                    .length ===
                                                    1
                                                    ? "item"
                                                    : "items"}
                                            </span>
                                        </div>

                                        <div>
                                            {order.items.map(
                                                (
                                                    item,
                                                    index
                                                ) => {
                                                    const product =
                                                        item.product ||
                                                        {};

                                                    const itemName =
                                                        product.name ||
                                                        item.name ||
                                                        "Sneaker";

                                                    const price =
                                                        product.price ??
                                                        item.price ??
                                                        0;

                                                    return (
                                                        <motion.div
                                                            key={`${product.id || item.id || index}-${item.size || ""}`}
                                                            className="d-flex align-items-center justify-content-between gap-3 py-3"
                                                            initial={{
                                                                opacity: 0,
                                                                x: -10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.25 +
                                                                    index *
                                                                    0.06,
                                                            }}
                                                            style={{
                                                                borderBottom:
                                                                    index <
                                                                        order
                                                                            .items
                                                                            .length -
                                                                        1
                                                                        ? "1px solid #eeeeee"
                                                                        : "none",
                                                            }}
                                                        >
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div
                                                                    className="d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "42px",
                                                                        height: "42px",
                                                                        borderRadius:
                                                                            "11px",
                                                                        background:
                                                                            "#f5f5f5",
                                                                        color:
                                                                            "#777777",
                                                                        flexShrink:
                                                                            0,
                                                                    }}
                                                                >
                                                                    <Package
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <p
                                                                        className="fw-semibold mb-1"
                                                                        style={{
                                                                            fontSize:
                                                                                "11px",
                                                                            color:
                                                                                "#222222",
                                                                        }}
                                                                    >
                                                                        {
                                                                            itemName
                                                                        }
                                                                    </p>

                                                                    <p
                                                                        className="mb-0"
                                                                        style={{
                                                                            fontSize:
                                                                                "9px",
                                                                            color:
                                                                                "#999999",
                                                                        }}
                                                                    >
                                                                        Size{" "}
                                                                        {item.size ||
                                                                            "—"}{" "}
                                                                        ×{" "}
                                                                        {item.quantity ||
                                                                            1}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <span
                                                                className="fw-bold text-nowrap"
                                                                style={{
                                                                    fontSize:
                                                                        "11px",
                                                                    color:
                                                                        "#111111",
                                                                }}
                                                            >
                                                                ₹
                                                                {formatCurrency(
                                                                    price *
                                                                    (item.quantity ||
                                                                        1)
                                                                )}
                                                            </span>
                                                        </motion.div>
                                                    );
                                                }
                                            )}
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-4">

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: 0.1,
                            }}
                            style={{
                                position: "sticky",
                                top: "90px",
                            }}
                        >
                            {/* Order Summary */}
                            <div
                                className="mb-4"
                                style={{
                                    borderRadius: "18px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                    boxShadow:
                                        "0 8px 30px rgba(0,0,0,0.045)",
                                }}
                            >
                                <div className="p-4 p-md-5">

                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div
                                            className="d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius:
                                                    "12px",
                                                background:
                                                    "#111111",
                                                color:
                                                    "#ffffff",
                                            }}
                                        >
                                            <CreditCard
                                                size={19}
                                            />
                                        </div>

                                        <div>
                                            <p
                                                className="text-uppercase mb-1"
                                                style={{
                                                    fontSize:
                                                        "8px",
                                                    letterSpacing:
                                                        "1.4px",
                                                    color:
                                                        "#999999",
                                                    fontWeight:
                                                        "700",
                                                }}
                                            >
                                                Payment
                                            </p>

                                            <h5
                                                className="fw-bold mb-0"
                                                style={{
                                                    fontSize:
                                                        "16px",
                                                }}
                                            >
                                                Order Summary
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#777777",
                                            }}
                                        >
                                            Subtotal
                                        </span>

                                        <span
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#333333",
                                            }}
                                        >
                                            ₹
                                            {formatCurrency(
                                                order.subtotal
                                            )}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#777777",
                                            }}
                                        >
                                            Delivery
                                        </span>

                                        <span
                                            style={{
                                                fontSize:
                                                    "11px",
                                                color:
                                                    "#333333",
                                            }}
                                        >
                                            {Number(
                                                order.shipping ||
                                                0
                                            ) === 0
                                                ? "FREE"
                                                : `₹${formatCurrency(
                                                    order.shipping
                                                )}`}
                                        </span>
                                    </div>

                                    <div
                                        className="my-4"
                                        style={{
                                            height: "1px",
                                            background:
                                                "#eeeeee",
                                        }}
                                    />

                                    <div className="d-flex justify-content-between align-items-end mb-4">
                                        <div>
                                            <p
                                                className="mb-1"
                                                style={{
                                                    fontSize:
                                                        "9px",
                                                    color:
                                                        "#999999",
                                                    textTransform:
                                                        "uppercase",
                                                    letterSpacing:
                                                        "1px",
                                                }}
                                            >
                                                Total Paid
                                            </p>

                                            <strong
                                                style={{
                                                    fontSize:
                                                        "22px",
                                                    color:
                                                        "#111111",
                                                }}
                                            >
                                                ₹
                                                {formatCurrency(
                                                    order.total
                                                )}
                                            </strong>
                                        </div>

                                        <CheckCircle2
                                            size={21}
                                            style={{
                                                color:
                                                    "#ff5a1f",
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="d-flex align-items-center gap-2 p-3"
                                        style={{
                                            borderRadius:
                                                "11px",
                                            background:
                                                "#fafafa",
                                            border:
                                                "1px solid #eeeeee",
                                        }}
                                    >
                                        <CreditCard
                                            size={15}
                                            style={{
                                                color:
                                                    "#777777",
                                            }}
                                        />

                                        <div>
                                            <p
                                                className="mb-0"
                                                style={{
                                                    fontSize:
                                                        "9px",
                                                    color:
                                                        "#999999",
                                                }}
                                            >
                                                Payment Method
                                            </p>

                                            <p
                                                className="mb-0 fw-semibold"
                                                style={{
                                                    fontSize:
                                                        "10px",
                                                    color:
                                                        "#333333",
                                                }}
                                            >
                                                {paymentLabel}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Actions */}
                            <div className="d-flex flex-column gap-2">

                                <motion.div
                                    whileHover={{
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                >
                                    <Link
                                        to="/orders"
                                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            minHeight:
                                                "45px",
                                            borderRadius:
                                                "11px",
                                            background:
                                                "#111111",
                                            color:
                                                "#ffffff",
                                            border: "none",
                                            fontSize:
                                                "11px",
                                            fontWeight:
                                                "700",
                                        }}
                                    >
                                        <Package
                                            size={16}
                                        />
                                        View My Orders
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                >
                                    <Link
                                        to="/products"
                                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            minHeight:
                                                "45px",
                                            borderRadius:
                                                "11px",
                                            background:
                                                "#ffffff",
                                            color:
                                                "#333333",
                                            border:
                                                "1px solid #dddddd",
                                            fontSize:
                                                "11px",
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        <ShoppingBag
                                            size={16}
                                        />
                                        Continue Shopping
                                        <ArrowRight
                                            size={15}
                                        />
                                    </Link>
                                </motion.div>

                            </div>

                            {/* Trust Message */}
                            <div
                                className="d-flex align-items-center justify-content-center gap-2 mt-4"
                                style={{
                                    color: "#999999",
                                    fontSize: "9px",
                                }}
                            >
                                <CheckCircle2
                                    size={13}
                                    style={{
                                        color: "#ff5a1f",
                                    }}
                                />

                                Secure order confirmation
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;