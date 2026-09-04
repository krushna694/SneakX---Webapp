import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Check,
    ShoppingBag,
    CreditCard,
    ArrowRight,
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

    if (cartItems.length === 0) {
        return (
            <div className="container py-5">
                <motion.div
                    className="text-center py-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <ShoppingBag
                        size={55}
                        strokeWidth={1.4}
                        className="mb-3"
                    />

                    <h3 className="fw-semibold">
                        Your cart is empty
                    </h3>

                    <p className="text-muted">
                        Add some products before proceeding to checkout.
                    </p>
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
                <h2 className="fw-bold mb-2">
                    Checkout
                </h2>

                <p className="text-muted mb-0">
                    Review your order and complete your purchase.
                </p>
            </motion.div>

            <div className="row g-4">

                {/* LEFT SIDE */}
                <div className="col-lg-8">

                    {/* Delivery Address */}
                    <motion.div
                        className="card border-0 shadow-sm mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <MapPin size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Delivery Address
                                </h5>
                            </div>

                            {addresses.length === 0 ? (
                                <div className="text-center py-4">
                                    <MapPin
                                        size={40}
                                        strokeWidth={1.5}
                                        className="mb-3"
                                    />

                                    <h6 className="fw-semibold">
                                        No saved address
                                    </h6>

                                    <p className="text-muted mb-0">
                                        Please add a delivery address
                                        before placing your order.
                                    </p>
                                </div>
                            ) : (
                                <div className="row g-3">

                                    {addresses.map((address) => (
                                        <div
                                            className="col-md-6"
                                            key={address.id}
                                        >
                                            <motion.button
                                                type="button"
                                                className={`card w-100 text-start h-100 ${selectedAddressId ===
                                                        address.id
                                                        ? "border-dark"
                                                        : "border"
                                                    }`}
                                                onClick={() =>
                                                    setSelectedAddressId(
                                                        address.id
                                                    )
                                                }
                                                whileHover={{
                                                    y: -2,
                                                }}
                                                whileTap={{
                                                    scale: 0.98,
                                                }}
                                            >
                                                <div className="card-body p-3">

                                                    <div className="d-flex justify-content-between align-items-start mb-2">

                                                        <div className="d-flex align-items-center gap-2">
                                                            <MapPin
                                                                size={17}
                                                            />

                                                            <strong className="text-capitalize">
                                                                {
                                                                    address.label
                                                                }
                                                            </strong>
                                                        </div>

                                                        {selectedAddressId ===
                                                            address.id && (
                                                                <Check
                                                                    size={18}
                                                                />
                                                            )}
                                                    </div>

                                                    <p className="fw-semibold mb-1">
                                                        {
                                                            address.fullName
                                                        }
                                                    </p>

                                                    <p className="text-muted small mb-1">
                                                        {
                                                            address.addressLine
                                                        }
                                                    </p>

                                                    <p className="text-muted small mb-1">
                                                        {address.city},{" "}
                                                        {address.state}
                                                    </p>

                                                    <p className="text-muted small mb-1">
                                                        {
                                                            address.pincode
                                                        }
                                                    </p>

                                                    <p className="text-muted small mb-0">
                                                        {
                                                            address.phone
                                                        }
                                                    </p>

                                                </div>
                                            </motion.button>
                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    </motion.div>

                    {/* Payment Method */}
                    <motion.div
                        className="card border-0 shadow-sm mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1,
                        }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <CreditCard size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Payment Method
                                </h5>
                            </div>

                            {/* Cash on Delivery */}
                            <div className="form-check border rounded p-3 mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="cod"
                                    value="COD"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={(event) =>
                                        setPaymentMethod(
                                            event.target.value
                                        )
                                    }
                                />

                                <label
                                    className="form-check-label fw-medium"
                                    htmlFor="cod"
                                >
                                    Cash on Delivery
                                </label>
                            </div>

                            {/* Online Payment */}
                            <div className="form-check border rounded p-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="online"
                                    value="ONLINE"
                                    checked={
                                        paymentMethod === "ONLINE"
                                    }
                                    onChange={(event) =>
                                        setPaymentMethod(
                                            event.target.value
                                        )
                                    }
                                />

                                <label
                                    className="form-check-label fw-medium"
                                    htmlFor="online"
                                >
                                    Online Payment
                                </label>
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
                                <ShoppingBag size={21} />

                                <h5 className="fw-semibold mb-0">
                                    Order Summary
                                </h5>
                            </div>

                            {/* Products */}
                            <div className="mb-3">

                                {cartItems.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.size}`}
                                        className="d-flex justify-content-between gap-3 mb-3"
                                    >
                                        <div>
                                            <p className="mb-1 fw-medium">
                                                {
                                                    item.product.name
                                                }
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

                            <hr />

                            {/* Subtotal */}
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">
                                    Subtotal
                                </span>

                                <span>
                                    ₹
                                    {cartTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>

                            {/* Delivery */}
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Delivery
                                </span>

                                <span>
                                    {deliveryCharge === 0
                                        ? "FREE"
                                        : `₹${deliveryCharge}`}
                                </span>
                            </div>

                            <hr />

                            {/* Total */}
                            <div className="d-flex justify-content-between mb-4">
                                <strong>
                                    Total
                                </strong>

                                <strong>
                                    ₹
                                    {finalTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>

                            {/* Place Order */}
                            <motion.button
                                type="button"
                                className="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2"
                                disabled={!selectedAddress}
                                onClick={handlePlaceOrder}
                                whileHover={{
                                    scale: selectedAddress
                                        ? 1.02
                                        : 1,
                                }}
                                whileTap={{
                                    scale: selectedAddress
                                        ? 0.98
                                        : 1,
                                }}
                            >
                                Place Order
                                <ArrowRight size={18} />
                            </motion.button>

                            {!selectedAddress && (
                                <small className="text-danger d-block text-center mt-2">
                                    Please select a delivery address.
                                </small>
                            )}

                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
}

export default Checkout;