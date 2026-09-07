import { motion } from "framer-motion";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";

function CartItem({ item }) {
    const {
        updateQuantity,
        removeFromCart,
    } = useCart();

    const { product, quantity, size } = item;

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(product.id, size, quantity - 1);
        }
    };

    const handleIncrease = () => {
        updateQuantity(product.id, size, quantity + 1);
    };

    const handleRemove = () => {
        removeFromCart(product.id, size);
    };

    return (
        <motion.div
            className="card border-0 mb-3 overflow-hidden"
            style={{
                borderRadius: "18px",
                background: "#ffffff",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.06)",
            }}
            initial={{
                opacity: 0,
                y: 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            whileHover={{
                y: -3,
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.09)",
            }}
            transition={{
                duration: 0.35,
            }}
        >
            <div className="card-body p-3 p-md-4">
                <div className="row align-items-center g-3">

                    {/* Product Visual */}
                    <div className="col-4 col-sm-3 col-md-2">
                        <motion.div
                            className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
                            style={{
                                height: "130px",
                                borderRadius: "15px",
                                background:
                                    "linear-gradient(135deg, #f7f7f7 0%, #eeeeee 100%)",
                            }}
                            whileHover={{
                                scale: 1.02,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: "85px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    background: "#ffffff",
                                    transform:
                                        "rotate(-12deg) skewX(-12deg)",
                                    boxShadow:
                                        "0 14px 20px rgba(0,0,0,0.16)",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "48px",
                                        height: "9px",
                                        borderRadius: "50%",
                                        background: "#ff5a1f",
                                        top: "11px",
                                        left: "19px",
                                        transform: "rotate(-18deg)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        width: "92px",
                                        height: "9px",
                                        borderRadius: "8px",
                                        background: "#dedede",
                                        bottom: "-4px",
                                        left: "-3px",
                                    }}
                                />
                            </div>

                            <span
                                className="position-absolute"
                                style={{
                                    bottom: "9px",
                                    right: "10px",
                                    fontSize: "9px",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    color: "#999999",
                                }}
                            >
                                SNEAKX
                            </span>
                        </motion.div>
                    </div>

                    {/* Product Information */}
                    <div className="col-8 col-sm-9 col-md-4">
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex align-items-start justify-content-between gap-2">
                                <div>
                                    <p
                                        className="mb-1 text-uppercase fw-semibold"
                                        style={{
                                            fontSize: "10px",
                                            letterSpacing: "1.5px",
                                            color: "#999999",
                                        }}
                                    >
                                        SneakX Collection
                                    </p>

                                    <h5
                                        className="fw-bold mb-2"
                                        style={{
                                            fontSize: "17px",
                                        }}
                                    >
                                        {product.name}
                                    </h5>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span
                                    className="badge rounded-pill"
                                    style={{
                                        background: "#f4f4f4",
                                        color: "#222222",
                                        padding:
                                            "7px 11px",
                                        fontSize: "11px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Size {size}
                                </span>

                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#888888",
                                    }}
                                >
                                    ₹
                                    {product.price.toLocaleString(
                                        "en-IN"
                                    )}{" "}
                                    / pair
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2 mt-1">
                                <ShoppingBag
                                    size={14}
                                    color="#ff5a1f"
                                />

                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#777777",
                                    }}
                                >
                                    Ready to ship
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-7 col-sm-6 col-md-3">
                        <p
                            className="mb-2 text-uppercase fw-semibold"
                            style={{
                                fontSize: "10px",
                                letterSpacing: "1.2px",
                                color: "#999999",
                            }}
                        >
                            Quantity
                        </p>

                        <div
                            className="d-inline-flex align-items-center"
                            style={{
                                border: "1px solid #e5e5e5",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <motion.button
                                type="button"
                                onClick={handleDecrease}
                                disabled={quantity <= 1}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                className="btn border-0 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    background: "#f8f8f8",
                                    color:
                                        quantity <= 1
                                            ? "#cccccc"
                                            : "#111111",
                                }}
                            >
                                <Minus size={15} />
                            </motion.button>

                            <span
                                className="fw-bold d-flex align-items-center justify-content-center"
                                style={{
                                    width: "42px",
                                    fontSize: "14px",
                                }}
                            >
                                {quantity}
                            </span>

                            <motion.button
                                type="button"
                                onClick={handleIncrease}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                className="btn border-0 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    background: "#f8f8f8",
                                    color: "#111111",
                                }}
                            >
                                <Plus size={15} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Total + Remove */}
                    <div className="col-5 col-sm-6 col-md-3">
                        <div className="text-md-end">
                            <p
                                className="mb-1 text-uppercase fw-semibold"
                                style={{
                                    fontSize: "10px",
                                    letterSpacing: "1.2px",
                                    color: "#999999",
                                }}
                            >
                                Item Total
                            </p>

                            <p
                                className="fw-bold mb-3"
                                style={{
                                    fontSize: "19px",
                                }}
                            >
                                ₹
                                {(
                                    product.price *
                                    quantity
                                ).toLocaleString("en-IN")}
                            </p>

                            <motion.button
                                type="button"
                                onClick={handleRemove}
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className="btn btn-sm d-inline-flex align-items-center gap-2"
                                style={{
                                    borderRadius: "9px",
                                    border:
                                        "1px solid #eeeeee",
                                    background: "#ffffff",
                                    color: "#666666",
                                    padding:
                                        "7px 11px",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                }}
                            >
                                <Trash2 size={14} />
                                Remove
                            </motion.button>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default CartItem;