import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Banknote,
    Check,
    CheckCircle2,
    CreditCard,
    LockKeyhole,
    MapPin,
    PackageCheck,
    ShoppingBag,
    ShieldCheck,
    Truck,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { useAddress } from "../../features/address/hooks/useAddress";
import { useOrder } from "../../features/order/hooks/useOrder";

function Checkout() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartTotal,
        clearCart,
    } = useCart();

    const {
        addresses,
        getDefaultAddress,
    } = useAddress();

    const {
        createOrder,
    } = useOrder();

    const defaultAddress = getDefaultAddress();

    const [selectedAddressId, setSelectedAddressId] = useState(
        defaultAddress?.id || null
    );

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const selectedAddress = addresses.find(
        (address) => address.id === selectedAddressId
    );

    const deliveryCharge = cartTotal > 0 ? 100 : 0;

    const finalTotal = cartTotal + deliveryCharge;

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            return;
        }

        const newOrder = createOrder({
            items: cartItems,
            address: selectedAddress,
            paymentMethod,
            subtotal: cartTotal,
            shipping: deliveryCharge,
            total: finalTotal,
        });

        clearCart();

        navigate("/order-confirmation", {
            state: {
                order: newOrder,
            },
        });
    };

    /* =========================================
       EMPTY CART
    ========================================== */

    if (cartItems.length === 0) {
        return (
            <motion.main
                className="container py-5"
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <div
                    className="mx-auto text-center p-4 p-md-5"
                    style={{
                        maxWidth: "700px",
                        borderRadius: "24px",
                        background:
                            "linear-gradient(135deg, #fafafa 0%, #f1f1f1 100%)",
                        border: "1px solid #eeeeee",
                    }}
                >
                    <motion.div
                        className="mx-auto d-flex align-items-center justify-content-center"
                        style={{
                            width: "82px",
                            height: "82px",
                            borderRadius: "50%",
                            background: "#111111",
                            color: "#ffffff",
                        }}
                        initial={{
                            scale: 0.8,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.45,
                            type: "spring",
                            stiffness: 170,
                        }}
                    >
                        <ShoppingBag size={34} />
                    </motion.div>

                    <p
                        className="text-uppercase fw-semibold mb-2 mt-4"
                        style={{
                            fontSize: "9px",
                            letterSpacing: "2px",
                            color: "#ff5a1f",
                        }}
                    >
                        SneakX Checkout
                    </p>

                    <h2
                        className="fw-bold mb-2"
                        style={{
                            fontSize:
                                "clamp(26px, 4vw, 36px)",
                            letterSpacing: "-0.8px",
                        }}
                    >
                        Your Cart is Empty
                    </h2>

                    <p
                        className="text-muted mb-4 mx-auto"
                        style={{
                            maxWidth: "430px",
                            fontSize: "13px",
                            lineHeight: "1.7",
                        }}
                    >
                        Add some sneakers to your cart before
                        proceeding to checkout.
                    </p>

                    <motion.button
                        type="button"
                        className="btn text-white d-inline-flex align-items-center gap-2 border-0"
                        style={{
                            background: "#111111",
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                        onClick={() => navigate("/products")}
                        whileHover={{
                            scale: 1.03,
                            backgroundColor: "#ff5a1f",
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        Browse Sneakers
                        <ArrowRight size={16} />
                    </motion.button>
                </div>
            </motion.main>
        );
    }

    return (
        <motion.main
            className="container py-4 py-md-5"
            initial={{
                opacity: 0,
                y: 18,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* =========================================
                HEADER
            ========================================== */}

            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="btn border-0 p-0 d-inline-flex align-items-center gap-2"
                    style={{
                        color: "#666666",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: "transparent",
                    }}
                >
                    <ArrowLeft size={15} />
                    Back to Cart
                </button>
            </div>

            <div className="row align-items-end g-3 mb-4 mb-md-5">
                <div className="col-lg-8">
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
                                    "0 12px 28px rgba(0,0,0,0.12)",
                            }}
                            whileHover={{
                                rotate: -4,
                                scale: 1.04,
                            }}
                        >
                            <PackageCheck size={25} />
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
                                SneakX
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
                                Checkout
                            </h1>
                        </div>
                    </div>

                    <p
                        className="text-muted mt-3 mb-0"
                        style={{
                            fontSize: "13px",
                        }}
                    >
                        Review your details and complete your
                        purchase.
                    </p>
                </div>

                {/* Secure indicator */}
                <div className="col-lg-4 text-lg-end">
                    <div
                        className="d-inline-flex align-items-center gap-2 px-3 py-2"
                        style={{
                            borderRadius: "30px",
                            background: "#f7f7f7",
                            border: "1px solid #eeeeee",
                        }}
                    >
                        <LockKeyhole
                            size={14}
                            color="#198754"
                        />

                        <span
                            style={{
                                fontSize: "10px",
                                color: "#666666",
                                fontWeight: "600",
                            }}
                        >
                            Secure Checkout
                        </span>
                    </div>
                </div>
            </div>

            {/* =========================================
                CHECKOUT PROGRESS
            ========================================== */}

            <motion.div
                className="d-flex align-items-center mb-5"
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: 0.1,
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#111111",
                            color: "#ffffff",
                            fontSize: "10px",
                            fontWeight: "700",
                        }}
                    >
                        <Check size={14} />
                    </div>

                    <span
                        style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            color: "#555555",
                        }}
                    >
                        Cart
                    </span>
                </div>

                <div
                    className="flex-grow-1 mx-2 mx-md-3"
                    style={{
                        height: "1px",
                        background: "#dddddd",
                    }}
                />

                <div className="d-flex align-items-center gap-2">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#ff5a1f",
                            color: "#ffffff",
                            fontSize: "10px",
                            fontWeight: "700",
                        }}
                    >
                        2
                    </div>

                    <span
                        style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            color: "#111111",
                        }}
                    >
                        Checkout
                    </span>
                </div>

                <div
                    className="flex-grow-1 mx-2 mx-md-3"
                    style={{
                        height: "1px",
                        background: "#dddddd",
                    }}
                />

                <div className="d-flex align-items-center gap-2">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#eeeeee",
                            color: "#999999",
                            fontSize: "10px",
                            fontWeight: "700",
                        }}
                    >
                        3
                    </div>

                    <span
                        className="d-none d-sm-block"
                        style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            color: "#999999",
                        }}
                    >
                        Confirmation
                    </span>
                </div>
            </motion.div>

            <div className="row g-4 g-xl-5">

                {/* =====================================
                    LEFT SIDE
                ====================================== */}

                <div className="col-lg-8">

                    {/* DELIVERY ADDRESS */}

                    <motion.section
                        className="card border-0 mb-4 overflow-hidden"
                        style={{
                            borderRadius: "20px",
                            boxShadow:
                                "0 8px 30px rgba(0,0,0,0.06)",
                        }}
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
                        }}
                    >
                        <div className="card-body p-4 p-md-4">

                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="d-flex align-items-center gap-3">
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
                                        <MapPin size={19} />
                                    </div>

                                    <div>
                                        <p
                                            className="text-uppercase fw-semibold mb-1"
                                            style={{
                                                fontSize: "9px",
                                                letterSpacing:
                                                    "1.6px",
                                                color: "#ff5a1f",
                                            }}
                                        >
                                            Step 01
                                        </p>

                                        <h5
                                            className="fw-bold mb-0"
                                            style={{
                                                fontSize: "17px",
                                            }}
                                        >
                                            Delivery Address
                                        </h5>
                                    </div>
                                </div>

                                <Truck
                                    size={19}
                                    color="#aaaaaa"
                                />
                            </div>

                            {addresses.length === 0 ? (
                                <div
                                    className="text-center py-4 px-3"
                                    style={{
                                        borderRadius: "15px",
                                        background: "#f8f8f8",
                                        border: "1px dashed #dddddd",
                                    }}
                                >
                                    <MapPin
                                        size={32}
                                        color="#aaaaaa"
                                        strokeWidth={1.4}
                                    />

                                    <h6
                                        className="fw-bold mt-3 mb-1"
                                    >
                                        No saved address
                                    </h6>

                                    <p
                                        className="text-muted mb-0"
                                        style={{
                                            fontSize: "12px",
                                        }}
                                    >
                                        Please add a delivery
                                        address before placing
                                        your order.
                                    </p>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {addresses.map(
                                        (address) => {
                                            const isSelected =
                                                selectedAddressId ===
                                                address.id;

                                            return (
                                                <div
                                                    className="col-md-6"
                                                    key={
                                                        address.id
                                                    }
                                                >
                                                    <motion.button
                                                        type="button"
                                                        className="w-100 text-start border-0 p-0"
                                                        onClick={() =>
                                                            setSelectedAddressId(
                                                                address.id
                                                            )
                                                        }
                                                        whileHover={{
                                                            y: -3,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.985,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                borderRadius:
                                                                    "16px",
                                                                padding:
                                                                    "16px",
                                                                background:
                                                                    isSelected
                                                                        ? "#fff7f2"
                                                                        : "#fafafa",
                                                                border: isSelected
                                                                    ? "1.5px solid #ff5a1f"
                                                                    : "1px solid #eeeeee",
                                                                boxShadow:
                                                                    isSelected
                                                                        ? "0 10px 25px rgba(255,90,31,0.10)"
                                                                        : "none",
                                                                transition:
                                                                    "all 200ms ease",
                                                            }}
                                                        >
                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <MapPin
                                                                        size={
                                                                            16
                                                                        }
                                                                        color={
                                                                            isSelected
                                                                                ? "#ff5a1f"
                                                                                : "#888888"
                                                                        }
                                                                    />

                                                                    <span
                                                                        className="text-capitalize fw-bold"
                                                                        style={{
                                                                            fontSize:
                                                                                "12px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            address.label
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <div
                                                                    className="d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "22px",
                                                                        height: "22px",
                                                                        borderRadius:
                                                                            "50%",
                                                                        background:
                                                                            isSelected
                                                                                ? "#ff5a1f"
                                                                                : "#eeeeee",
                                                                        color: "#ffffff",
                                                                    }}
                                                                >
                                                                    {isSelected && (
                                                                        <Check
                                                                            size={
                                                                                13
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <p
                                                                className="fw-bold mb-2"
                                                                style={{
                                                                    fontSize:
                                                                        "13px",
                                                                }}
                                                            >
                                                                {
                                                                    address.fullName
                                                                }
                                                            </p>

                                                            <p
                                                                className="mb-1"
                                                                style={{
                                                                    color: "#777777",
                                                                    fontSize:
                                                                        "11px",
                                                                    lineHeight:
                                                                        "1.6",
                                                                }}
                                                            >
                                                                {
                                                                    address.addressLine
                                                                }
                                                            </p>

                                                            <p
                                                                className="mb-1"
                                                                style={{
                                                                    color: "#777777",
                                                                    fontSize:
                                                                        "11px",
                                                                }}
                                                            >
                                                                {
                                                                    address.city
                                                                }
                                                                ,{" "}
                                                                {
                                                                    address.state
                                                                }{" "}
                                                                —{" "}
                                                                {
                                                                    address.pincode
                                                                }
                                                            </p>

                                                            <p
                                                                className="mb-0"
                                                                style={{
                                                                    color: "#777777",
                                                                    fontSize:
                                                                        "11px",
                                                                }}
                                                            >
                                                                {
                                                                    address.phone
                                                                }
                                                            </p>

                                                            {isSelected && (
                                                                <div
                                                                    className="d-flex align-items-center gap-1 mt-3"
                                                                    style={{
                                                                        color: "#198754",
                                                                        fontSize:
                                                                            "10px",
                                                                        fontWeight:
                                                                            "700",
                                                                    }}
                                                                >
                                                                    <CheckCircle2
                                                                        size={
                                                                            13
                                                                        }
                                                                    />
                                                                    Selected for
                                                                    delivery
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.button>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.section>

                    {/* PAYMENT */}

                    <motion.section
                        className="card border-0 mb-4 overflow-hidden"
                        style={{
                            borderRadius: "20px",
                            boxShadow:
                                "0 8px 30px rgba(0,0,0,0.06)",
                        }}
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
                            delay: 0.08,
                        }}
                    >
                        <div className="card-body p-4 p-md-4">

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
                                    <CreditCard size={19} />
                                </div>

                                <div>
                                    <p
                                        className="text-uppercase fw-semibold mb-1"
                                        style={{
                                            fontSize: "9px",
                                            letterSpacing:
                                                "1.6px",
                                            color: "#ff5a1f",
                                        }}
                                    >
                                        Step 02
                                    </p>

                                    <h5
                                        className="fw-bold mb-0"
                                        style={{
                                            fontSize: "17px",
                                        }}
                                    >
                                        Payment Method
                                    </h5>
                                </div>
                            </div>

                            <div className="row g-3">

                                {/* COD */}
                                <div className="col-md-6">
                                    <motion.button
                                        type="button"
                                        className="w-100 text-start border-0 p-0"
                                        onClick={() =>
                                            setPaymentMethod(
                                                "COD"
                                            )
                                        }
                                        whileHover={{
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.985,
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderRadius:
                                                    "16px",
                                                padding: "16px",
                                                background:
                                                    paymentMethod ===
                                                        "COD"
                                                        ? "#fff7f2"
                                                        : "#fafafa",
                                                border:
                                                    paymentMethod ===
                                                        "COD"
                                                        ? "1.5px solid #ff5a1f"
                                                        : "1px solid #eeeeee",
                                                transition:
                                                    "all 200ms ease",
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius:
                                                            "11px",
                                                        background:
                                                            paymentMethod ===
                                                                "COD"
                                                                ? "#ff5a1f"
                                                                : "#eeeeee",
                                                        color:
                                                            paymentMethod ===
                                                                "COD"
                                                                ? "#ffffff"
                                                                : "#777777",
                                                    }}
                                                >
                                                    <Banknote
                                                        size={19}
                                                    />
                                                </div>

                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "22px",
                                                        height: "22px",
                                                        borderRadius:
                                                            "50%",
                                                        background:
                                                            paymentMethod ===
                                                                "COD"
                                                                ? "#ff5a1f"
                                                                : "#eeeeee",
                                                        color: "#ffffff",
                                                    }}
                                                >
                                                    {paymentMethod ===
                                                        "COD" && (
                                                            <Check
                                                                size={13}
                                                            />
                                                        )}
                                                </div>
                                            </div>

                                            <h6
                                                className="fw-bold mt-3 mb-1"
                                                style={{
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                Cash on Delivery
                                            </h6>

                                            <p
                                                className="mb-0"
                                                style={{
                                                    color: "#888888",
                                                    fontSize:
                                                        "10px",
                                                    lineHeight:
                                                        "1.5",
                                                }}
                                            >
                                                Pay when your
                                                sneakers arrive.
                                            </p>
                                        </div>
                                    </motion.button>
                                </div>

                                {/* Online */}
                                <div className="col-md-6">
                                    <motion.button
                                        type="button"
                                        className="w-100 text-start border-0 p-0"
                                        onClick={() =>
                                            setPaymentMethod(
                                                "ONLINE"
                                            )
                                        }
                                        whileHover={{
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.985,
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderRadius:
                                                    "16px",
                                                padding: "16px",
                                                background:
                                                    paymentMethod ===
                                                        "ONLINE"
                                                        ? "#fff7f2"
                                                        : "#fafafa",
                                                border:
                                                    paymentMethod ===
                                                        "ONLINE"
                                                        ? "1.5px solid #ff5a1f"
                                                        : "1px solid #eeeeee",
                                                transition:
                                                    "all 200ms ease",
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius:
                                                            "11px",
                                                        background:
                                                            paymentMethod ===
                                                                "ONLINE"
                                                                ? "#ff5a1f"
                                                                : "#eeeeee",
                                                        color:
                                                            paymentMethod ===
                                                                "ONLINE"
                                                                ? "#ffffff"
                                                                : "#777777",
                                                    }}
                                                >
                                                    <CreditCard
                                                        size={19}
                                                    />
                                                </div>

                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "22px",
                                                        height: "22px",
                                                        borderRadius:
                                                            "50%",
                                                        background:
                                                            paymentMethod ===
                                                                "ONLINE"
                                                                ? "#ff5a1f"
                                                                : "#eeeeee",
                                                        color: "#ffffff",
                                                    }}
                                                >
                                                    {paymentMethod ===
                                                        "ONLINE" && (
                                                            <Check
                                                                size={13}
                                                            />
                                                        )}
                                                </div>
                                            </div>

                                            <h6
                                                className="fw-bold mt-3 mb-1"
                                                style={{
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                Online Payment
                                            </h6>

                                            <p
                                                className="mb-0"
                                                style={{
                                                    color: "#888888",
                                                    fontSize:
                                                        "10px",
                                                    lineHeight:
                                                        "1.5",
                                                }}
                                            >
                                                Secure online
                                                payment.
                                            </p>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Payment security */}
                            <div
                                className="d-flex align-items-center gap-2 mt-4"
                                style={{
                                    color: "#888888",
                                    fontSize: "10px",
                                }}
                            >
                                <ShieldCheck
                                    size={14}
                                    color="#198754"
                                />

                                <span>
                                    Payment information is
                                    handled securely.
                                </span>
                            </div>
                        </div>
                    </motion.section>

                </div>

                {/* =====================================
                    RIGHT SIDE — ORDER SUMMARY
                ====================================== */}

                <div className="col-lg-4">
                    <motion.aside
                        className="card border-0 overflow-hidden"
                        style={{
                            borderRadius: "20px",
                            boxShadow:
                                "0 12px 38px rgba(0,0,0,0.08)",
                            position: "sticky",
                            top: "95px",
                        }}
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                        }}
                    >
                        {/* Summary Header */}
                        <div
                            className="p-4"
                            style={{
                                background: "#111111",
                                color: "#ffffff",
                            }}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "11px",
                                        background:
                                            "#ff5a1f",
                                    }}
                                >
                                    <ShoppingBag size={18} />
                                </div>

                                <div>
                                    <p
                                        className="text-uppercase mb-1"
                                        style={{
                                            fontSize: "8px",
                                            letterSpacing:
                                                "1.7px",
                                            color: "#bbbbbb",
                                        }}
                                    >
                                        Final Review
                                    </p>

                                    <h5
                                        className="fw-bold mb-0"
                                        style={{
                                            fontSize: "17px",
                                        }}
                                    >
                                        Order Summary
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4">

                            {/* Products */}
                            <div className="mb-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.size}`}
                                        className="d-flex gap-3 mb-3"
                                    >
                                        <div
                                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius:
                                                    "12px",
                                                background:
                                                    "#f3f3f3",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "800",
                                                color: "#999999",
                                            }}
                                        >
                                            SNX
                                        </div>

                                        <div className="flex-grow-1">
                                            <p
                                                className="fw-bold mb-1"
                                                style={{
                                                    fontSize:
                                                        "12px",
                                                }}
                                            >
                                                {
                                                    item.product
                                                        .name
                                                }
                                            </p>

                                            <div className="d-flex align-items-center gap-2">
                                                <span
                                                    style={{
                                                        fontSize:
                                                            "10px",
                                                        color:
                                                            "#888888",
                                                    }}
                                                >
                                                    Size{" "}
                                                    {
                                                        item.size
                                                    }
                                                </span>

                                                <span
                                                    style={{
                                                        width: "3px",
                                                        height: "3px",
                                                        borderRadius:
                                                            "50%",
                                                        background:
                                                            "#cccccc",
                                                    }}
                                                />

                                                <span
                                                    style={{
                                                        fontSize:
                                                            "10px",
                                                        color:
                                                            "#888888",
                                                    }}
                                                >
                                                    Qty{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <span
                                            className="fw-semibold"
                                            style={{
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            ₹
                                            {(
                                                item.product
                                                    .price *
                                                item.quantity
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <hr
                                style={{
                                    borderColor: "#eeeeee",
                                    opacity: 1,
                                }}
                            />

                            {/* Price Details */}
                            <div className="mt-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <span
                                        style={{
                                            fontSize:
                                                "12px",
                                            color: "#777777",
                                        }}
                                    >
                                        Subtotal
                                    </span>

                                    <span
                                        className="fw-semibold"
                                        style={{
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        ₹
                                        {cartTotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span
                                        style={{
                                            fontSize:
                                                "12px",
                                            color: "#777777",
                                        }}
                                    >
                                        Delivery
                                    </span>

                                    <span
                                        className="fw-semibold"
                                        style={{
                                            fontSize:
                                                "12px",
                                            color:
                                                deliveryCharge ===
                                                    0
                                                    ? "#198754"
                                                    : "#111111",
                                        }}
                                    >
                                        {deliveryCharge ===
                                            0
                                            ? "FREE"
                                            : `₹${deliveryCharge}`}
                                    </span>
                                </div>
                            </div>

                            <div
                                className="d-flex justify-content-between align-items-end pt-3 mt-2"
                                style={{
                                    borderTop:
                                        "1px solid #eeeeee",
                                }}
                            >
                                <div>
                                    <p
                                        className="text-uppercase fw-semibold mb-1"
                                        style={{
                                            fontSize: "8px",
                                            letterSpacing:
                                                "1.4px",
                                            color: "#999999",
                                        }}
                                    >
                                        Total
                                    </p>

                                    <span
                                        style={{
                                            fontSize:
                                                "10px",
                                            color: "#999999",
                                        }}
                                    >
                                        Including delivery
                                    </span>
                                </div>

                                <span
                                    className="fw-bold"
                                    style={{
                                        fontSize: "24px",
                                        letterSpacing:
                                            "-0.7px",
                                    }}
                                >
                                    ₹
                                    {finalTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>

                            {/* Place Order */}
                            <motion.button
                                type="button"
                                className="btn w-100 border-0 text-white d-flex justify-content-center align-items-center gap-2 mt-4"
                                disabled={!selectedAddress}
                                onClick={handlePlaceOrder}
                                style={{
                                    background:
                                        selectedAddress
                                            ? "#111111"
                                            : "#dddddd",
                                    color: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "14px 18px",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    cursor:
                                        selectedAddress
                                            ? "pointer"
                                            : "not-allowed",
                                    boxShadow:
                                        selectedAddress
                                            ? "0 12px 25px rgba(0,0,0,0.12)"
                                            : "none",
                                }}
                                whileHover={
                                    selectedAddress
                                        ? {
                                            scale: 1.02,
                                            backgroundColor:
                                                "#ff5a1f",
                                        }
                                        : {}
                                }
                                whileTap={
                                    selectedAddress
                                        ? {
                                            scale: 0.97,
                                        }
                                        : {}
                                }
                            >
                                Place Order
                                <ArrowRight size={17} />
                            </motion.button>

                            {!selectedAddress && (
                                <motion.div
                                    className="d-flex align-items-center justify-content-center gap-2 mt-3"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    style={{
                                        color: "#dc3545",
                                        fontSize: "10px",
                                        fontWeight: "600",
                                    }}
                                >
                                    <MapPin size={13} />
                                    Select a delivery address
                                </motion.div>
                            )}

                            {/* Trust */}
                            <div
                                className="d-flex align-items-center justify-content-center gap-2 mt-4 pt-3"
                                style={{
                                    borderTop:
                                        "1px solid #eeeeee",
                                    color: "#999999",
                                    fontSize: "9px",
                                }}
                            >
                                <LockKeyhole size={12} />

                                <span>
                                    Secure SneakX checkout
                                </span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </motion.main>
    );
}

export default Checkout;