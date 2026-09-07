import { useState } from "react";
import { motion } from "framer-motion";
import {
    Check,
    ChevronRight,
    MapPin,
    Plus,
    ShieldCheck,
} from "lucide-react";

import AddressCard from "../../features/address/components/AddressCard";
import AddressForm from "../../features/address/components/AddressForm";
import { useAddress } from "../../features/address/hooks/useAddress";

function Addresses() {
    const { addresses } = useAddress();

    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] =
        useState(null);

    const defaultAddress = addresses.find(
        (address) => address.isDefault
    );

    const handleAddAddress = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleCancel = () => {
        setEditingAddress(null);
        setShowForm(false);
    };

    const handleSuccess = () => {
        setEditingAddress(null);
        setShowForm(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fafafa",
            }}
        >
            <div className="container py-4 py-md-5">

                {/* Page Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -18,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4 mb-4">
                        <div>
                            <div
                                className="d-flex align-items-center gap-2 mb-3"
                                style={{
                                    fontSize: "10px",
                                    color: "#999999",
                                    fontWeight: "600",
                                }}
                            >
                                <span>Profile</span>

                                <ChevronRight size={12} />

                                <span
                                    style={{
                                        color: "#222222",
                                    }}
                                >
                                    Addresses
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-3 mb-2">
                                <motion.div
                                    className="d-flex align-items-center justify-content-center"
                                    whileHover={{
                                        rotate: 4,
                                        scale: 1.04,
                                    }}
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "14px",
                                        background: "#111111",
                                        color: "#ffffff",
                                        flexShrink: 0,
                                    }}
                                >
                                    <MapPin size={21} />
                                </motion.div>

                                <div>
                                    <p
                                        className="text-uppercase mb-1"
                                        style={{
                                            fontSize: "8px",
                                            letterSpacing: "1.8px",
                                            color: "#999999",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Account Settings
                                    </p>

                                    <h2
                                        className="fw-bold mb-0"
                                        style={{
                                            fontSize:
                                                "clamp(24px, 4vw, 32px)",
                                            letterSpacing:
                                                "-0.6px",
                                            color: "#111111",
                                        }}
                                    >
                                        My Addresses
                                    </h2>
                                </div>
                            </div>

                            <p
                                className="mb-0"
                                style={{
                                    maxWidth: "560px",
                                    color: "#777777",
                                    fontSize: "12px",
                                    lineHeight: "1.7",
                                }}
                            >
                                Manage your saved delivery
                                addresses and choose where your
                                next SneakX order should arrive.
                            </p>
                        </div>

                        <motion.button
                            type="button"
                            className="btn d-inline-flex align-items-center justify-content-center gap-2"
                            onClick={handleAddAddress}
                            style={{
                                minHeight: "44px",
                                padding: "0 18px",
                                borderRadius: "11px",
                                background: "#111111",
                                border: "none",
                                color: "#ffffff",
                                fontSize: "11px",
                                fontWeight: "700",
                                boxShadow:
                                    "0 8px 22px rgba(0,0,0,0.12)",
                            }}
                            whileHover={{
                                y: -2,
                                boxShadow:
                                    "0 12px 28px rgba(0,0,0,0.16)",
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            <Plus size={16} />
                            Add New Address
                        </motion.button>
                    </div>
                </motion.div>

                {/* Summary */}
                {addresses.length > 0 && (
                    <motion.div
                        className="row g-3 mb-5"
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="col-sm-6 col-lg-4">
                            <div
                                className="h-100 d-flex align-items-center gap-3 p-3"
                                style={{
                                    borderRadius: "14px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "11px",
                                        background: "#f5f5f5",
                                        color: "#555555",
                                    }}
                                >
                                    <MapPin size={17} />
                                </div>

                                <div>
                                    <p
                                        className="mb-1"
                                        style={{
                                            fontSize: "9px",
                                            color: "#999999",
                                            textTransform:
                                                "uppercase",
                                            letterSpacing: "1px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Saved Addresses
                                    </p>

                                    <p
                                        className="mb-0 fw-bold"
                                        style={{
                                            fontSize: "14px",
                                            color: "#111111",
                                        }}
                                    >
                                        {addresses.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-4">
                            <div
                                className="h-100 d-flex align-items-center gap-3 p-3"
                                style={{
                                    borderRadius: "14px",
                                    background: "#ffffff",
                                    border: "1px solid #eeeeee",
                                }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "11px",
                                        background:
                                            defaultAddress
                                                ? "#fff1eb"
                                                : "#f5f5f5",
                                        color: defaultAddress
                                            ? "#ff5a1f"
                                            : "#777777",
                                    }}
                                >
                                    <Check size={17} />
                                </div>

                                <div>
                                    <p
                                        className="mb-1"
                                        style={{
                                            fontSize: "9px",
                                            color: "#999999",
                                            textTransform:
                                                "uppercase",
                                            letterSpacing: "1px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Default Address
                                    </p>

                                    <p
                                        className="mb-0 fw-bold text-truncate"
                                        style={{
                                            maxWidth: "180px",
                                            fontSize: "13px",
                                            color: "#111111",
                                        }}
                                    >
                                        {defaultAddress
                                            ? defaultAddress.label
                                            : "Not selected"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div
                                className="h-100 d-flex align-items-center gap-3 p-3"
                                style={{
                                    borderRadius: "14px",
                                    background: "#111111",
                                    border: "1px solid #111111",
                                }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "11px",
                                        background:
                                            "rgba(255,255,255,0.1)",
                                        color: "#ffffff",
                                    }}
                                >
                                    <ShieldCheck size={17} />
                                </div>

                                <div>
                                    <p
                                        className="mb-1"
                                        style={{
                                            fontSize: "9px",
                                            color: "#999999",
                                            textTransform:
                                                "uppercase",
                                            letterSpacing: "1px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Checkout Ready
                                    </p>

                                    <p
                                        className="mb-0"
                                        style={{
                                            fontSize: "11px",
                                            color: "#dddddd",
                                        }}
                                    >
                                        Your saved address is
                                        ready to use.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Section */}
                {addresses.length > 0 && (
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <div>
                            <p
                                className="text-uppercase mb-1"
                                style={{
                                    fontSize: "8px",
                                    letterSpacing: "1.5px",
                                    color: "#999999",
                                    fontWeight: "700",
                                }}
                            >
                                Your Locations
                            </p>

                            <h5
                                className="fw-bold mb-0"
                                style={{
                                    fontSize: "17px",
                                }}
                            >
                                Saved Addresses
                            </h5>
                        </div>

                        <span
                            style={{
                                fontSize: "10px",
                                color: "#999999",
                            }}
                        >
                            {addresses.length}{" "}
                            {addresses.length === 1
                                ? "address"
                                : "addresses"}
                        </span>
                    </div>
                )}

                {/* Address Cards */}
                {addresses.length > 0 ? (
                    <motion.div
                        className="row g-4"
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
                        {addresses.map((address) => (
                            <motion.div
                                key={address.id}
                                className="col-md-6"
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
                            >
                                <AddressCard
                                    address={address}
                                    onEdit={
                                        handleEditAddress
                                    }
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        style={{
                            minHeight: "390px",
                            padding: "40px 20px",
                            borderRadius: "20px",
                            background: "#ffffff",
                            border: "1px solid #eeeeee",
                            boxShadow:
                                "0 10px 35px rgba(0,0,0,0.045)",
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
                            <MapPin
                                size={31}
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
                            Delivery Details
                        </p>

                        <h4
                            className="fw-bold mb-2"
                            style={{
                                fontSize: "21px",
                            }}
                        >
                            No saved addresses
                        </h4>

                        <p
                            className="mb-4"
                            style={{
                                maxWidth: "420px",
                                color: "#777777",
                                fontSize: "11px",
                                lineHeight: "1.7",
                            }}
                        >
                            Add your first delivery address to
                            make checkout faster and easier.
                        </p>

                        <motion.button
                            type="button"
                            className="btn d-inline-flex align-items-center gap-2"
                            onClick={handleAddAddress}
                            style={{
                                minHeight: "43px",
                                padding: "0 18px",
                                borderRadius: "10px",
                                background: "#111111",
                                color: "#ffffff",
                                border: "none",
                                fontSize: "11px",
                                fontWeight: "700",
                            }}
                            whileHover={{
                                y: -2,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            <Plus size={16} />
                            Add Your First Address
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* AddressForm owns its own window */}
            {showForm && (
                <AddressForm
                    key={editingAddress?.id ?? "new-address"}
                    editingAddress={editingAddress}
                    onCancel={handleCancel}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}

export default Addresses;