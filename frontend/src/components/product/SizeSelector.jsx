import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sizes = [6, 7, 8, 9, 10, 11];

function SizeSelector({
    selectedSize,
    onSizeChange,
}) {
    return (
        <div className="mt-4">

            <div className="d-flex align-items-center justify-content-between mb-3">

                <div>
                    <h6
                        className="mb-1"
                        style={{
                            fontSize: "0.78rem",
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}
                    >
                        Select Size
                    </h6>

                    <span
                        style={{
                            color: "#999",
                            fontSize: "0.7rem",
                        }}
                    >
                        UK / India
                    </span>
                </div>

                {selectedSize && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        className="d-flex align-items-center gap-1"
                        style={{
                            color:
                                "var(--sx-accent)",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                        }}
                    >
                        <Check size={14} />

                        Size {selectedSize}
                    </motion.div>
                )}

            </div>

            <div className="d-flex flex-wrap gap-2">

                {sizes.map((size) => {
                    const isSelected =
                        selectedSize === size;

                    return (
                        <motion.button
                            key={size}
                            type="button"
                            onClick={() =>
                                onSizeChange(size)
                            }
                            whileHover={{
                                y: -3,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                            className="position-relative d-flex align-items-center justify-content-center border"
                            style={{
                                width: "58px",
                                height: "48px",
                                borderRadius: "11px",
                                borderColor:
                                    isSelected
                                        ? "#111111"
                                        : "#dededb",
                                background:
                                    isSelected
                                        ? "#111111"
                                        : "#ffffff",
                                color:
                                    isSelected
                                        ? "#ffffff"
                                        : "#333333",
                                fontSize: "0.82rem",
                                fontWeight: 800,
                                transition:
                                    "all 180ms ease",
                            }}
                        >
                            {size}

                            {isSelected && (
                                <motion.span
                                    layoutId="selected-size"
                                    className="position-absolute"
                                    style={{
                                        width: "5px",
                                        height: "5px",
                                        borderRadius:
                                            "50%",
                                        background:
                                            "var(--sx-accent)",
                                        bottom: "6px",
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}

            </div>

            {!selectedSize && (
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    className="mt-3 mb-0"
                    style={{
                        color: "#999",
                        fontSize: "0.72rem",
                    }}
                >
                    Select a size to continue.
                </motion.p>
            )}

        </div>
    );
}

export default SizeSelector;