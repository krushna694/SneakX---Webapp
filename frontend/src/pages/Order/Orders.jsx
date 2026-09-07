import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    MapPin,
    Package,
    Receipt,
    ShoppingBag,
    Truck,
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

    const formatCurrency = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case "PLACED":
                return {
                    label: "Order Placed",
                    icon: CheckCircle2,
                    background: "#eef9f1",
                    color: "#287a3f",
                };

            case "PROCESSING":
                return {
                    label: "Processing",
                    icon: Package,
                    background: "#fff7e8",
                    color: "#a46a00",
                };

            case "SHIPPED":
                return {
                    label: "Shipped",
                    icon: Truck,
                    background: "#eef5ff",
                    color: "#3169a8",
                };

            case "DELIVERED":
                return {
                    label: "Delivered",
                    icon: CheckCircle2,
                    background: "#eef9f1",
                    color: "#287a3f",
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    icon: Package,
                    background: "#fff0f0",
                    color: "#b44444",
                };

            default:
                return {
                    label: status || "Order",
                    icon: Package,
                    background: "#f5f5f5",
                    color: "#555555",
                };
        }
    };

    /* =========================================================
       EMPTY STATE
    ========================================================= */

    if (orders.length === 0) {
        return (
            <main
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
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        style={{
                            minHeight: "68vh",
                        }}
                    >
                        <motion.div
                            className="d-flex align-items-center justify-content-center mb-4"
                            initial={{
                                scale: 0.8,
                            }}
                            animate={{
                                scale: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 15,
                            }}
                            style={{
                                width: "82px",
                                height: "82px",
                                borderRadius: "24px",
                                background: "#111111",
                                color: "#ffffff",
                                boxShadow:
                                    "0 18px 45px rgba(0,0,0,0.12)",
                            }}
                        >
                            <Package
                                size={35}
                                strokeWidth={1.5}
                            />
                        </motion.div>

                        <p
                            className="text-uppercase mb-2"
                            style={{
                                fontSize: "8px",
                                letterSpacing: "1.8px",
                                color: "#ff5a1f",
                                fontWeight: "800",
                            }}
                        >
                            Your Collection
                        </p>

                        <h1
                            className="fw-bold mb-2"
                            style={{
                                fontSize: "28px",
                                color: "#111111",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            No orders yet
                        </h1>

                        <p
                            className="mb-4"
                            style={{
                                maxWidth: "390px",
                                fontSize: "11px",
                                color: "#777777",
                                lineHeight: "1.7",
                            }}
                        >
                            Your future sneaker purchases will appear
                            here. Find your next pair and make your
                            first order.
                        </p>

                        <motion.div
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            <Link
                                to="/products"
                                className="btn d-inline-flex align-items-center justify-content-center gap-2"
                                style={{
                                    minHeight: "45px",
                                    padding: "0 20px",
                                    borderRadius: "11px",
                                    background: "#111111",
                                    color: "#ffffff",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                }}
                            >
                                <ShoppingBag size={16} />
                                Start Shopping
                                <ArrowRight size={15} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        );
    }

    /* =========================================================
       ORDERS PAGE
    ========================================================= */

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#fafafa",
            }}
        >
            <div className="container py-4 py-md-5">

                {/* =================================================
                    PAGE HEADER
                ================================================== */}

                <motion.div
                    className="mb-5"
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.45,
                    }}
                >
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">

                        <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "11px",
                                        background: "#111111",
                                        color: "#ffffff",
                                    }}
                                >
                                    <Package size={18} />
                                </div>

                                <div>
                                    <p
                                        className="text-uppercase mb-0"
                                        style={{
                                            fontSize: "8px",
                                            letterSpacing: "1.5px",
                                            color: "#999999",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Account
                                    </p>

                                    <h1
                                        className="fw-bold mb-0"
                                        style={{
                                            fontSize: "25px",
                                            color: "#111111",
                                            letterSpacing: "-0.4px",
                                        }}
                                    >
                                        My Orders
                                    </h1>
                                </div>
                            </div>

                            <p
                                className="mb-0"
                                style={{
                                    fontSize: "11px",
                                    color: "#777777",
                                }}
                            >
                                Track and manage your SneakX purchases.
                            </p>
                        </div>

                        <div
                            className="d-inline-flex align-items-center gap-2 align-self-start align-self-md-end"
                            style={{
                                padding: "9px 13px",
                                borderRadius: "10px",
                                background: "#ffffff",
                                border: "1px solid #eeeeee",
                            }}
                        >
                            <Receipt
                                size={14}
                                style={{
                                    color: "#777777",
                                }}
                            />

                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#555555",
                                    fontWeight: "600",
                                }}
                            >
                                {orders.length}{" "}
                                {orders.length === 1
                                    ? "Order"
                                    : "Orders"}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* =================================================
                    ORDER LIST
                ================================================== */}

                <motion.div
                    className="d-flex flex-column gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                    {orders.map((order) => {
                        const statusConfig =
                            getStatusConfig(order.status);

                        const StatusIcon =
                            statusConfig.icon;

                        const itemCount =
                            order.items?.reduce(
                                (total, item) =>
                                    total +
                                    Number(
                                        item.quantity || 0
                                    ),
                                0
                            ) || 0;

                        return (
                            <motion.article
                                key={order.id}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                }}
                                whileHover={{
                                    y: -4,
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                style={{
                                    borderRadius: "20px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                    boxShadow:
                                        "0 10px 35px rgba(0,0,0,0.045)",
                                    overflow: "hidden",
                                }}
                            >
                                {/* =================================================
                                    ORDER TOP BAR
                                ================================================== */}

                                <div
                                    className="px-4 px-md-5 py-3"
                                    style={{
                                        background: "#fafafa",
                                        borderBottom:
                                            "1px solid #eeeeee",
                                    }}
                                >
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                                        <div className="d-flex align-items-center gap-3">
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "38px",
                                                    height: "38px",
                                                    borderRadius: "10px",
                                                    background:
                                                        "#ffffff",
                                                    border:
                                                        "1px solid #eeeeee",
                                                    color:
                                                        "#555555",
                                                }}
                                            >
                                                <Receipt size={16} />
                                            </div>

                                            <div>
                                                <p
                                                    className="text-uppercase mb-1"
                                                    style={{
                                                        fontSize: "7px",
                                                        letterSpacing:
                                                            "1.4px",
                                                        color:
                                                            "#999999",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Order ID
                                                </p>

                                                <p
                                                    className="fw-bold mb-0"
                                                    style={{
                                                        fontSize:
                                                            "11px",
                                                        color:
                                                            "#111111",
                                                    }}
                                                >
                                                    #{order.id}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">

                                            <div className="d-flex align-items-center gap-2">
                                                <CalendarDays
                                                    size={14}
                                                    style={{
                                                        color:
                                                            "#999999",
                                                    }}
                                                />

                                                <span
                                                    style={{
                                                        fontSize:
                                                            "10px",
                                                        color:
                                                            "#666666",
                                                    }}
                                                >
                                                    {formatDate(
                                                        order.createdAt
                                                    )}
                                                </span>
                                            </div>

                                            <span
                                                className="d-inline-flex align-items-center gap-1"
                                                style={{
                                                    padding:
                                                        "7px 10px",
                                                    borderRadius:
                                                        "20px",
                                                    background:
                                                        statusConfig.background,
                                                    color:
                                                        statusConfig.color,
                                                    fontSize:
                                                        "8px",
                                                    fontWeight:
                                                        "800",
                                                }}
                                            >
                                                <StatusIcon
                                                    size={12}
                                                />
                                                {
                                                    statusConfig.label
                                                }
                                            </span>

                                        </div>
                                    </div>
                                </div>

                                {/* =================================================
                                    ORDER BODY
                                ================================================== */}

                                <div className="p-4 p-md-5">

                                    {/* Product Preview */}
                                    <div className="mb-4">

                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <ShoppingBag
                                                    size={15}
                                                    style={{
                                                        color:
                                                            "#777777",
                                                    }}
                                                />

                                                <span
                                                    className="text-uppercase"
                                                    style={{
                                                        fontSize:
                                                            "8px",
                                                        letterSpacing:
                                                            "1.2px",
                                                        color:
                                                            "#999999",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Items
                                                </span>
                                            </div>

                                            <span
                                                style={{
                                                    fontSize:
                                                        "9px",
                                                    color:
                                                        "#999999",
                                                }}
                                            >
                                                {itemCount}{" "}
                                                {itemCount === 1
                                                    ? "item"
                                                    : "items"}
                                            </span>
                                        </div>

                                        <div
                                            className="d-flex flex-column"
                                            style={{
                                                border:
                                                    "1px solid #eeeeee",
                                                borderRadius:
                                                    "13px",
                                                overflow:
                                                    "hidden",
                                            }}
                                        >
                                            {order.items?.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <motion.div
                                                        key={`${item.product?.id || index}-${item.size}`}
                                                        className="d-flex align-items-center justify-content-between gap-3 px-3 py-3"
                                                        whileHover={{
                                                            background:
                                                                "#fafafa",
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
                                                                        "10px",
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
                                                                            "10px",
                                                                        color:
                                                                            "#222222",
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .product
                                                                            ?.name
                                                                    }
                                                                </p>

                                                                <p
                                                                    className="mb-0"
                                                                    style={{
                                                                        fontSize:
                                                                            "8px",
                                                                        color:
                                                                            "#999999",
                                                                    }}
                                                                >
                                                                    Size{" "}
                                                                    {
                                                                        item.size
                                                                    }{" "}
                                                                    · Qty{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <span
                                                            className="fw-bold text-nowrap"
                                                            style={{
                                                                fontSize:
                                                                    "10px",
                                                                color:
                                                                    "#111111",
                                                            }}
                                                        >
                                                            ₹
                                                            {formatCurrency(
                                                                (item
                                                                    .product
                                                                    ?.price ||
                                                                    0) *
                                                                    (item.quantity ||
                                                                        1)
                                                            )}
                                                        </span>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom Information */}
                                    <div
                                        className="pt-4"
                                        style={{
                                            borderTop:
                                                "1px solid #eeeeee",
                                        }}
                                    >
                                        <div className="row g-4">

                                            {/* Address */}
                                            <div className="col-lg-7">
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <MapPin
                                                        size={15}
                                                        style={{
                                                            color:
                                                                "#777777",
                                                        }}
                                                    />

                                                    <span
                                                        className="text-uppercase"
                                                        style={{
                                                            fontSize:
                                                                "8px",
                                                            letterSpacing:
                                                                "1.2px",
                                                            color:
                                                                "#999999",
                                                            fontWeight:
                                                                "700",
                                                        }}
                                                    >
                                                        Delivery Address
                                                    </span>
                                                </div>

                                                {order.address && (
                                                    <div>
                                                        <p
                                                            className="fw-bold mb-1"
                                                            style={{
                                                                fontSize:
                                                                    "11px",
                                                                color:
                                                                    "#222222",
                                                            }}
                                                        >
                                                            {
                                                                order
                                                                    .address
                                                                    .fullName
                                                            }
                                                        </p>

                                                        <p
                                                            className="mb-1"
                                                            style={{
                                                                fontSize:
                                                                    "10px",
                                                                color:
                                                                    "#777777",
                                                                lineHeight:
                                                                    "1.6",
                                                            }}
                                                        >
                                                            {
                                                                order
                                                                    .address
                                                                    .addressLine
                                                            }
                                                        </p>

                                                        <p
                                                            className="mb-1"
                                                            style={{
                                                                fontSize:
                                                                    "10px",
                                                                color:
                                                                    "#777777",
                                                            }}
                                                        >
                                                            {
                                                                order
                                                                    .address
                                                                    .city
                                                            }
                                                            ,{" "}
                                                            {
                                                                order
                                                                    .address
                                                                    .state
                                                            }{" "}
                                                            —{" "}
                                                            {
                                                                order
                                                                    .address
                                                                    .pincode
                                                            }
                                                        </p>

                                                        <p
                                                            className="mb-0"
                                                            style={{
                                                                fontSize:
                                                                    "10px",
                                                                color:
                                                                    "#777777",
                                                            }}
                                                        >
                                                            +91{" "}
                                                            {
                                                                order
                                                                    .address
                                                                    .phone
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Summary */}
                                            <div className="col-lg-5">

                                                <div className="d-flex justify-content-between mb-2">
                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "10px",
                                                            color:
                                                                "#888888",
                                                        }}
                                                    >
                                                        Subtotal
                                                    </span>

                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "10px",
                                                            color:
                                                                "#444444",
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
                                                                "10px",
                                                            color:
                                                                "#888888",
                                                        }}
                                                    >
                                                        Delivery
                                                    </span>

                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "10px",
                                                            color:
                                                                "#444444",
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
                                                    className="mb-3"
                                                    style={{
                                                        height: "1px",
                                                        background:
                                                            "#eeeeee",
                                                    }}
                                                />

                                                <div className="d-flex justify-content-between align-items-end mb-3">
                                                    <div>
                                                        <p
                                                            className="mb-1"
                                                            style={{
                                                                fontSize:
                                                                    "8px",
                                                                color:
                                                                    "#999999",
                                                                textTransform:
                                                                    "uppercase",
                                                                letterSpacing:
                                                                    "1px",
                                                            }}
                                                        >
                                                            Order Total
                                                        </p>

                                                        <strong
                                                            style={{
                                                                fontSize:
                                                                    "19px",
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

                                                    <div className="d-flex align-items-center gap-1">
                                                        <CreditCard
                                                            size={13}
                                                            style={{
                                                                color:
                                                                    "#999999",
                                                            }}
                                                        />

                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "8px",
                                                                color:
                                                                    "#777777",
                                                            }}
                                                        >
                                                            {
                                                                order.paymentMethod
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <motion.div
                                                    whileHover={{
                                                        y: -2,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.98,
                                                    }}
                                                >
                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                                        style={{
                                                            minHeight:
                                                                "43px",
                                                            borderRadius:
                                                                "10px",
                                                            background:
                                                                "#111111",
                                                            color:
                                                                "#ffffff",
                                                            border:
                                                                "none",
                                                            fontSize:
                                                                "10px",
                                                            fontWeight:
                                                                "700",
                                                        }}
                                                    >
                                                        View Order Details
                                                        <ChevronRight
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </Link>
                                                </motion.div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </main>
    );
}

export default Orders;