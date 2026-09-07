import { AnimatePresence, motion } from "framer-motion";
import {
    Check,
    MapPin,
    Pencil,
    Star,
    Trash2,
    X,
} from "lucide-react";

import { useState } from "react";
import { useAddress } from "../hooks/useAddress";

function AddressCard({ address, onEdit }) {
    const {
        deleteAddress,
        setDefaultAddress,
    } = useAddress();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        deleteAddress(address.id);
        setShowDeleteModal(false);
    };

    const handleSetDefault = () => {
        setDefaultAddress(address.id);
    };

    return (
        <>
            <motion.article
                className="h-100 position-relative overflow-hidden"
                initial={{
                    opacity: 0,
                    y: 22,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                whileHover={{
                    y: -6,
                }}
                transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: address.isDefault
                        ? "1px solid #ffcfbd"
                        : "1px solid #eeeeee",
                    boxShadow: address.isDefault
                        ? "0 12px 35px rgba(255, 90, 31, 0.08)"
                        : "0 8px 28px rgba(0, 0, 0, 0.055)",
                }}
            >
                {address.isDefault && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background: "#ff5a1f",
                        }}
                    />
                )}

                <div className="p-4 d-flex flex-column h-100">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "12px",
                                    background: address.isDefault
                                        ? "#fff1eb"
                                        : "#f5f5f5",
                                    color: address.isDefault
                                        ? "#ff5a1f"
                                        : "#777777",
                                }}
                            >
                                <MapPin size={19} />
                            </div>

                            <div>
                                <p
                                    className="text-uppercase fw-semibold mb-1"
                                    style={{
                                        fontSize: "8px",
                                        letterSpacing: "1.5px",
                                        color: "#999999",
                                    }}
                                >
                                    Delivery Address
                                </p>

                                <h5
                                    className="fw-bold mb-0 text-capitalize"
                                    style={{
                                        fontSize: "16px",
                                    }}
                                >
                                    {address.label || "Address"}
                                </h5>
                            </div>
                        </div>

                        {address.isDefault && (
                            <motion.span
                                className="d-inline-flex align-items-center gap-1"
                                initial={{
                                    opacity: 0,
                                    scale: 0.85,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                style={{
                                    padding: "6px 9px",
                                    borderRadius: "20px",
                                    background: "#111111",
                                    color: "#ffffff",
                                    fontSize: "9px",
                                    fontWeight: "700",
                                }}
                            >
                                <Check size={12} />
                                Default
                            </motion.span>
                        )}
                    </div>

                    {/* Address Details */}
                    <div className="mb-4">
                        <h6
                            className="fw-bold mb-2"
                            style={{
                                fontSize: "13px",
                            }}
                        >
                            {address.fullName}
                        </h6>

                        <p
                            className="mb-1"
                            style={{
                                color: "#666666",
                                fontSize: "12px",
                                lineHeight: "1.65",
                            }}
                        >
                            {address.addressLine}
                        </p>

                        <p
                            className="mb-1"
                            style={{
                                color: "#666666",
                                fontSize: "12px",
                            }}
                        >
                            {address.city}, {address.state}
                        </p>

                        <p
                            className="mb-1"
                            style={{
                                color: "#666666",
                                fontSize: "12px",
                            }}
                        >
                            PIN — {address.pincode}
                        </p>

                        <p
                            className="mb-0"
                            style={{
                                color: "#666666",
                                fontSize: "12px",
                            }}
                        >
                            +91 {address.phone}
                        </p>
                    </div>

                    <div
                        className="mb-3"
                        style={{
                            height: "1px",
                            background: "#eeeeee",
                        }}
                    />

                    {/* Actions */}
                    <div className="d-flex flex-wrap gap-2 mt-auto">
                        {!address.isDefault && (
                            <motion.button
                                type="button"
                                className="btn d-inline-flex align-items-center gap-2"
                                onClick={handleSetDefault}
                                style={{
                                    border: "1px solid #eeeeee",
                                    background: "#ffffff",
                                    color: "#555555",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                    fontWeight: "600",
                                    padding: "8px 11px",
                                }}
                                whileHover={{
                                    color: "#ff5a1f",
                                    borderColor: "#ffd0c0",
                                    background: "#fffaf7",
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                            >
                                <Star size={14} />
                                Set Default
                            </motion.button>
                        )}

                        <motion.button
                            type="button"
                            className="btn d-inline-flex align-items-center gap-2"
                            onClick={() => onEdit(address)}
                            style={{
                                border: "1px solid #eeeeee",
                                background: "#ffffff",
                                color: "#555555",
                                borderRadius: "10px",
                                fontSize: "10px",
                                fontWeight: "600",
                                padding: "8px 11px",
                            }}
                            whileHover={{
                                background: "#f7f7f7",
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                        >
                            <Pencil size={14} />
                            Edit
                        </motion.button>

                        <motion.button
                            type="button"
                            className="btn d-inline-flex align-items-center gap-2"
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            style={{
                                border: "1px solid #f0d2d2",
                                background: "#fffafa",
                                color: "#c94b4b",
                                borderRadius: "10px",
                                fontSize: "10px",
                                fontWeight: "600",
                                padding: "8px 11px",
                            }}
                            whileHover={{
                                background: "#fff1f1",
                                borderColor: "#e7b5b5",
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                        >
                            <Trash2 size={14} />
                            Delete
                        </motion.button>
                    </div>
                </div>
            </motion.article>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        style={{
                            zIndex: 3000,
                            background:
                                "rgba(0, 0, 0, 0.62)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter:
                                "blur(8px)",
                            padding: "20px",
                        }}
                        onClick={() =>
                            setShowDeleteModal(false)
                        }
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="delete-address-title"
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 15,
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
                            className="position-relative"
                            style={{
                                width: "min(440px, 100%)",
                                borderRadius: "20px",
                                background: "#ffffff",
                                boxShadow:
                                    "0 25px 80px rgba(0,0,0,0.25)",
                                overflow: "hidden",
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            {/* Top Accent */}
                            <div
                                style={{
                                    height: "4px",
                                    background: "#c94b4b",
                                }}
                            />

                            <div className="p-4 p-md-5">
                                {/* Close */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                    className="btn position-absolute top-0 end-0 mt-3 me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        borderRadius: "9px",
                                        background: "#f5f5f5",
                                        color: "#555555",
                                        border: "none",
                                    }}
                                >
                                    <X size={16} />
                                </button>

                                {/* Icon */}
                                <motion.div
                                    initial={{
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.05,
                                        duration: 0.25,
                                    }}
                                    className="d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "15px",
                                        background: "#fff1f1",
                                        color: "#c94b4b",
                                    }}
                                >
                                    <Trash2 size={22} />
                                </motion.div>

                                <p
                                    className="text-uppercase mb-1"
                                    style={{
                                        fontSize: "8px",
                                        letterSpacing: "1.6px",
                                        color: "#999999",
                                        fontWeight: "700",
                                    }}
                                >
                                    Remove Address
                                </p>

                                <h4
                                    id="delete-address-title"
                                    className="fw-bold mb-2"
                                    style={{
                                        fontSize: "20px",
                                        color: "#111111",
                                    }}
                                >
                                    Delete this address?
                                </h4>

                                <p
                                    className="mb-4"
                                    style={{
                                        fontSize: "11px",
                                        lineHeight: "1.7",
                                        color: "#777777",
                                    }}
                                >
                                    You're about to remove your{" "}
                                    <strong
                                        style={{
                                            color: "#333333",
                                        }}
                                    >
                                        {address.label ||
                                            "saved"}
                                    </strong>{" "}
                                    delivery address. This action
                                    cannot be undone.
                                </p>

                                {/* Address Preview */}
                                <div
                                    className="d-flex align-items-start gap-3 p-3 mb-4"
                                    style={{
                                        borderRadius: "12px",
                                        background: "#fafafa",
                                        border: "1px solid #eeeeee",
                                    }}
                                >
                                    <MapPin
                                        size={17}
                                        style={{
                                            color: "#888888",
                                            marginTop: "2px",
                                            flexShrink: 0,
                                        }}
                                    />

                                    <div>
                                        <p
                                            className="fw-bold mb-1"
                                            style={{
                                                fontSize: "11px",
                                                color: "#222222",
                                            }}
                                        >
                                            {address.fullName}
                                        </p>

                                        <p
                                            className="mb-0"
                                            style={{
                                                fontSize: "10px",
                                                lineHeight: "1.6",
                                                color: "#777777",
                                            }}
                                        >
                                            {address.addressLine},{" "}
                                            {address.city},{" "}
                                            {address.state}
                                        </p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex flex-column flex-sm-row gap-2">
                                    <motion.button
                                        type="button"
                                        className="btn flex-fill d-flex align-items-center justify-content-center gap-2"
                                        onClick={() =>
                                            setShowDeleteModal(
                                                false
                                            )
                                        }
                                        style={{
                                            minHeight: "43px",
                                            borderRadius: "10px",
                                            border:
                                                "1px solid #e5e5e5",
                                            background: "#ffffff",
                                            color: "#555555",
                                            fontSize: "11px",
                                            fontWeight: "600",
                                        }}
                                        whileHover={{
                                            background: "#f7f7f7",
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                    >
                                        <X size={15} />
                                        Keep Address
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        className="btn flex-fill d-flex align-items-center justify-content-center gap-2"
                                        onClick={handleDelete}
                                        style={{
                                            minHeight: "43px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: "#c94b4b",
                                            color: "#ffffff",
                                            fontSize: "11px",
                                            fontWeight: "700",
                                        }}
                                        whileHover={{
                                            y: -2,
                                            boxShadow:
                                                "0 8px 20px rgba(201,75,75,0.2)",
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                    >
                                        <Trash2 size={15} />
                                        Delete Address
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

export default AddressCard;