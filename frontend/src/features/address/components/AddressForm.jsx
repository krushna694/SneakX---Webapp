import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Building2,
    CheckCircle2,
    Hash,
    Home,
    Map,
    MapPin,
    Phone,
    Save,
    User,
    X,
} from "lucide-react";

import { useAddress } from "../hooks/useAddress";

const initialForm = {
    label: "",
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
};

function AddressForm({ editingAddress, onCancel, onSuccess }) {
    const { addAddress, updateAddress } = useAddress();

    const [formData, setFormData] = useState(() =>
        editingAddress
            ? {
                label: editingAddress.label || "",
                fullName: editingAddress.fullName || "",
                addressLine: editingAddress.addressLine || "",
                city: editingAddress.city || "",
                state: editingAddress.state || "",
                pincode: editingAddress.pincode || "",
                phone: editingAddress.phone || "",
            }
            : initialForm
    );

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const isEditing = Boolean(editingAddress);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.label.trim()) {
            newErrors.label = "Please enter an address label.";
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        }

        if (!formData.addressLine.trim()) {
            newErrors.addressLine = "Address is required.";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required.";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required.";
        }

        if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode =
                "PIN code must contain exactly 6 digits.";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone =
                "Phone number must contain exactly 10 digits.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSaving(true);

        setTimeout(() => {
            if (isEditing) {
                updateAddress(editingAddress.id, formData);
                setSuccessMessage(
                    "Address updated successfully."
                );
            } else {
                addAddress(formData);
                setSuccessMessage(
                    "Address added successfully."
                );
            }

            setIsSaving(false);

            setTimeout(() => {
                onSuccess();
            }, 700);
        }, 350);
    };

    const fieldVariants = {
        hidden: {
            opacity: 0,
            y: 12,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    const renderField = ({
        name,
        label,
        placeholder,
        icon: Icon,
        type = "text",
        maxLength,
    }) => (
        <motion.div
            className="col-md-6"
            variants={fieldVariants}
        >
            <label
                htmlFor={name}
                className="form-label fw-semibold mb-2"
                style={{
                    fontSize: "11px",
                    color: "#333333",
                }}
            >
                {label}
            </label>

            <div className="position-relative">
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        left: "13px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: errors[name]
                            ? "#c94b4b"
                            : "#999999",
                        pointerEvents: "none",
                    }}
                >
                    <Icon size={16} />
                </div>

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="form-control"
                    style={{
                        minHeight: "46px",
                        paddingLeft: "40px",
                        borderRadius: "11px",
                        border: errors[name]
                            ? "1px solid #df9b9b"
                            : "1px solid #e8e8e8",
                        background: "#fafafa",
                        fontSize: "12px",
                        boxShadow: "none",
                    }}
                />
            </div>

            <AnimatePresence>
                {errors[name] && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -4,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -4,
                        }}
                        className="mt-2"
                        style={{
                            color: "#c94b4b",
                            fontSize: "10px",
                        }}
                    >
                        {errors[name]}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <AnimatePresence>
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
                transition={{
                    duration: 0.25,
                }}
                style={{
                    zIndex: 2500,
                    background: "rgba(0, 0, 0, 0.68)",
                    backdropFilter: "blur(9px)",
                    WebkitBackdropFilter: "blur(9px)",
                    padding: "30px",
                }}
                onClick={onCancel}
            >
                {/* Address Form IS the Window */}
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.94,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.94,
                        y: 20,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="position-relative d-flex flex-column"
                    style={{
                        width: "75vw",
                        maxWidth: "1200px",
                        height: "85vh",
                        maxHeight: "900px",
                        borderRadius: "22px",
                        background: "#ffffff",
                        overflow: "hidden",
                        boxShadow:
                            "0 30px 100px rgba(0,0,0,0.3)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Window Header */}
                    <div
                        className="d-flex align-items-center justify-content-between px-4 px-md-5"
                        style={{
                            minHeight: "62px",
                            flexShrink: 0,
                            background: "#ffffff",
                            borderBottom: "1px solid #eeeeee",
                        }}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <MapPin
                                size={17}
                                style={{
                                    color: "#ff5a1f",
                                }}
                            />

                            <div>
                                <p
                                    className="text-uppercase mb-0"
                                    style={{
                                        fontSize: "9px",
                                        letterSpacing: "1.5px",
                                        fontWeight: "700",
                                        color: "#777777",
                                    }}
                                >
                                    {isEditing
                                        ? "Edit Address"
                                        : "Add Address"}
                                </p>
                            </div>
                        </div>

                        <motion.button
                            type="button"
                            onClick={onCancel}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "9px",
                                border: "1px solid #e5e5e5",
                                background: "#ffffff",
                                color: "#555555",
                            }}
                            whileHover={{
                                background: "#f5f5f5",
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                        >
                            <X size={16} />
                        </motion.button>
                    </div>

                    {/* Scrollable Form Content */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            background: "#fafafa",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "1050px",
                                margin: "0 auto",
                                padding: "30px",
                            }}
                        >
                            {/* Form Header */}
                            <div
                                className="mb-4 p-4 p-md-5"
                                style={{
                                    borderRadius: "18px",
                                    background:
                                        "linear-gradient(135deg, #111111 0%, #202020 100%)",
                                    color: "#ffffff",
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            borderRadius: "13px",
                                            background: "#ffffff",
                                            color: "#111111",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {isEditing ? (
                                            <MapPin size={21} />
                                        ) : (
                                            <Home size={21} />
                                        )}
                                    </div>

                                    <div>
                                        <p
                                            className="text-uppercase mb-1"
                                            style={{
                                                fontSize: "8px",
                                                letterSpacing:
                                                    "1.7px",
                                                color: "#aaaaaa",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {isEditing
                                                ? "Manage Address"
                                                : "New Delivery Address"}
                                        </p>

                                        <h4
                                            className="fw-bold mb-0"
                                            style={{
                                                fontSize: "20px",
                                            }}
                                        >
                                            {isEditing
                                                ? "Edit Address"
                                                : "Add New Address"}
                                        </h4>
                                    </div>
                                </div>

                                <p
                                    className="mb-0 mt-3"
                                    style={{
                                        color: "#bdbdbd",
                                        fontSize: "11px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {isEditing
                                        ? "Update your saved delivery details."
                                        : "Save your delivery details for a faster checkout experience."}
                                </p>
                            </div>

                            {/* Actual Form */}
                            <form onSubmit={handleSubmit}>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren:
                                                    0.05,
                                            },
                                        },
                                    }}
                                    style={{
                                        background: "#ffffff",
                                        border:
                                            "1px solid #eeeeee",
                                        borderRadius: "18px",
                                        padding: "30px",
                                    }}
                                >
                                    <div className="row g-4">
                                        {renderField({
                                            name: "label",
                                            label: "Address Label",
                                            placeholder:
                                                "Home, Office, etc.",
                                            icon: Home,
                                        })}

                                        {renderField({
                                            name: "fullName",
                                            label: "Full Name",
                                            placeholder:
                                                "Enter recipient name",
                                            icon: User,
                                        })}

                                        {/* Address */}
                                        <motion.div
                                            className="col-12"
                                            variants={fieldVariants}
                                        >
                                            <label
                                                htmlFor="addressLine"
                                                className="form-label fw-semibold mb-2"
                                                style={{
                                                    fontSize: "11px",
                                                    color: "#333333",
                                                }}
                                            >
                                                Address
                                            </label>

                                            <div className="position-relative">
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        left: "13px",
                                                        top: "13px",
                                                        color: errors.addressLine
                                                            ? "#c94b4b"
                                                            : "#999999",
                                                        pointerEvents:
                                                            "none",
                                                    }}
                                                >
                                                    <MapPin
                                                        size={16}
                                                    />
                                                </div>

                                                <textarea
                                                    id="addressLine"
                                                    name="addressLine"
                                                    value={
                                                        formData.addressLine
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    placeholder="House no., street, area, landmark"
                                                    rows="3"
                                                    className="form-control"
                                                    style={{
                                                        paddingLeft:
                                                            "40px",
                                                        borderRadius:
                                                            "11px",
                                                        border: errors.addressLine
                                                            ? "1px solid #df9b9b"
                                                            : "1px solid #e8e8e8",
                                                        background:
                                                            "#fafafa",
                                                        fontSize:
                                                            "12px",
                                                        resize:
                                                            "vertical",
                                                        boxShadow:
                                                            "none",
                                                    }}
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {errors.addressLine && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            y: -4,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -4,
                                                        }}
                                                        className="mt-2"
                                                        style={{
                                                            color: "#c94b4b",
                                                            fontSize:
                                                                "10px",
                                                        }}
                                                    >
                                                        {
                                                            errors.addressLine
                                                        }
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {renderField({
                                            name: "city",
                                            label: "City",
                                            placeholder:
                                                "Enter city",
                                            icon: Building2,
                                        })}

                                        {renderField({
                                            name: "state",
                                            label: "State",
                                            placeholder:
                                                "Enter state",
                                            icon: Map,
                                        })}

                                        {renderField({
                                            name: "pincode",
                                            label: "PIN Code",
                                            placeholder:
                                                "6-digit PIN code",
                                            icon: Hash,
                                            maxLength: 6,
                                        })}

                                        {renderField({
                                            name: "phone",
                                            label: "Phone Number",
                                            placeholder:
                                                "10-digit mobile number",
                                            icon: Phone,
                                            maxLength: 10,
                                        })}
                                    </div>

                                    {/* Success */}
                                    <AnimatePresence>
                                        {successMessage && (
                                            <motion.div
                                                className="d-flex align-items-center gap-2 mt-4 p-3"
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -8,
                                                }}
                                                style={{
                                                    borderRadius:
                                                        "11px",
                                                    background:
                                                        "#f0faf4",
                                                    border: "1px solid #ccebd8",
                                                    color: "#287a4b",
                                                    fontSize: "11px",
                                                    fontWeight:
                                                        "600",
                                                }}
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                />
                                                {successMessage}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Actions */}
                                    <motion.div
                                        className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-5 pt-4"
                                        variants={fieldVariants}
                                        style={{
                                            borderTop:
                                                "1px solid #eeeeee",
                                        }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={onCancel}
                                            className="btn d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                minHeight: "43px",
                                                padding: "0 18px",
                                                borderRadius:
                                                    "10px",
                                                border: "1px solid #e5e5e5",
                                                background:
                                                    "#ffffff",
                                                color: "#555555",
                                                fontSize: "11px",
                                                fontWeight: "600",
                                            }}
                                            whileHover={{
                                                background:
                                                    "#f7f7f7",
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                        >
                                            <X size={15} />
                                            Cancel
                                        </motion.button>

                                        <motion.button
                                            type="submit"
                                            disabled={isSaving}
                                            className="btn d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                minHeight: "43px",
                                                padding: "0 20px",
                                                borderRadius:
                                                    "10px",
                                                border: "none",
                                                background:
                                                    "#111111",
                                                color: "#ffffff",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                                opacity: isSaving
                                                    ? 0.75
                                                    : 1,
                                            }}
                                            whileHover={
                                                !isSaving
                                                    ? {
                                                        y: -2,
                                                        boxShadow:
                                                            "0 8px 20px rgba(0,0,0,0.15)",
                                                    }
                                                    : {}
                                            }
                                            whileTap={
                                                !isSaving
                                                    ? {
                                                        scale: 0.97,
                                                    }
                                                    : {}
                                            }
                                        >
                                            <Save size={15} />

                                            {isSaving
                                                ? "Saving..."
                                                : isEditing
                                                    ? "Update Address"
                                                    : "Save Address"}
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default AddressForm;