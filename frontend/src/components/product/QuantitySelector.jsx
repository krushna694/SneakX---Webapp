import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

function QuantitySelector({
    quantity,
    onQuantityChange,
}) {
    const decrease = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const increase = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <div className="mt-4">

            <div className="d-flex align-items-center justify-content-between mb-2">
                <h6
                    className="mb-0"
                    style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                    }}
                >
                    Quantity
                </h6>

                <span
                    style={{
                        color: "#999",
                        fontSize: "0.7rem",
                    }}
                >
                    Choose amount
                </span>
            </div>

            <div
                className="d-inline-flex align-items-center"
                style={{
                    height: "52px",
                    border: "1px solid #dededb",
                    borderRadius: "13px",
                    background: "#ffffff",
                    overflow: "hidden",
                }}
            >
                <motion.button
                    type="button"
                    onClick={decrease}
                    whileHover={{
                        backgroundColor: "#f4f4f2",
                    }}
                    whileTap={{
                        scale: 0.9,
                    }}
                    className="border-0 d-flex align-items-center justify-content-center"
                    style={{
                        width: "50px",
                        height: "100%",
                        background: "#ffffff",
                        color:
                            quantity === 1
                                ? "#c5c5c5"
                                : "#111111",
                    }}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                >
                    <Minus size={16} />
                </motion.button>

                <motion.span
                    key={quantity}
                    initial={{
                        opacity: 0,
                        y: -4,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        width: "48px",
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: "#111111",
                    }}
                >
                    {quantity}
                </motion.span>

                <motion.button
                    type="button"
                    onClick={increase}
                    whileHover={{
                        backgroundColor: "#f4f4f2",
                    }}
                    whileTap={{
                        scale: 0.9,
                    }}
                    className="border-0 d-flex align-items-center justify-content-center"
                    style={{
                        width: "50px",
                        height: "100%",
                        background: "#ffffff",
                        color: "#111111",
                    }}
                    aria-label="Increase quantity"
                >
                    <Plus size={16} />
                </motion.button>
            </div>
        </div>
    );
}

export default QuantitySelector;