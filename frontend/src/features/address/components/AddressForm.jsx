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
                setSuccessMessage("Address updated successfully.");
            } else {
                addAddress(formData);
                setSuccessMessage("Address added successfully.");
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
            y: 10,
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
                className="form-label mb-2"
                style={{
                    fontSize: "11px",
                    color: "#222",
                    fontWeight: "700",
                    letterSpacing: "0.1px",
                }}
            >
                {label}
            </label>

            <div
                className="position-relative"
                style={{
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                }}
            >
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: errors[name]
                            ? "#c94b4b"
                            : "#999",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                >
                    <Icon size={16} strokeWidth={1.8} />
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
                        minHeight: "48px",
                        paddingLeft: "42px",
                        paddingRight: "14px",
                        borderRadius: "12px",
                        border: errors[name]
                            ? "1px solid #df9b9b"
                            : "1px solid #e5e5e5",
                        background: "#fbfbfb",
                        fontSize: "12px",
                        color: "#222",
                        boxShadow: "none",
                        outline: "none",
                        transition:
                            "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.background = "#ffffff";
                        e.currentTarget.style.borderColor =
                            errors[name]
                                ? "#df9b9b"
                                : "#ff5a1f";
                        e.currentTarget.style.boxShadow =
                            errors[name]
                                ? "0 0 0 3px rgba(201,75,75,0.08)"
                                : "0 0 0 3px rgba(255,90,31,0.08)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.background = "#fbfbfb";
                        e.currentTarget.style.borderColor =
                            errors[name]
                                ? "#df9b9b"
                                : "#e5e5e5";
                        e.currentTarget.style.boxShadow = "none";
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
                            fontWeight: "500",
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                    zIndex: 2500,
                    background: "rgba(0,0,0,0.68)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "18px",
                }}
                onClick={onCancel}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.96,
                        y: 18,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.96,
                        y: 18,
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
                        minHeight: "520px",
                        borderRadius: "22px",
                        background: "#ffffff",
                        overflow: "hidden",
                        boxShadow:
                            "0 30px 100px rgba(0,0,0,0.32)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="d-flex align-items-center justify-content-between px-4 px-md-5"
                        style={{
                            minHeight: "64px",
                            flexShrink: 0,
                            background: "#ffffff",
                            borderBottom: "1px solid #eeeeee",
                        }}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "9px",
                                    background: "#fff3ed",
                                    color: "#ff5a1f",
                                }}
                            >
                                <MapPin
                                    size={16}
                                    strokeWidth={2}
                                />
                            </div>

                            <div>
                                <p
                                    className="text-uppercase mb-0"
                                    style={{
                                        fontSize: "9px",
                                        letterSpacing: "1.5px",
                                        fontWeight: "700",
                                        color: "#777",
                                    }}
                                >
                                    {isEditing
                                        ? "Edit Address"
                                        : "Add Address"}
                                </p>

                                <p
                                    className="mb-0"
                                    style={{
                                        fontSize: "11px",
                                        color: "#aaa",
                                        marginTop: "2px",
                                    }}
                                >
                                    Delivery information
                                </p>
                            </div>
                        </div>

                        <motion.button
                            type="button"
                            onClick={onCancel}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{
                                width: "36px",
                                height: "36px",
                                padding: 0,
                                borderRadius: "10px",
                                border: "1px solid #e6e6e6",
                                background: "#fff",
                                color: "#555",
                            }}
                            whileHover={{
                                background: "#f6f6f6",
                                scale: 1.04,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                        >
                            <X size={16} />
                        </motion.button>
                    </div>

                    {/* Scrollable Content */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            background: "#f7f7f7",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "1050px",
                                margin: "0 auto",
                                padding: "24px",
                            }}
                        >
                            {/* Compact Hero */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -8,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mb-4"
                                style={{
                                    borderRadius: "17px",
                                    padding: "22px 24px",
                                    background:
                                        "linear-gradient(135deg, #111111 0%, #202020 100%)",
                                    color: "#fff",
                                    boxShadow:
                                        "0 8px 24px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            borderRadius: "12px",
                                            background: "#fff",
                                            color: "#111",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {isEditing ? (
                                            <MapPin size={20} />
                                        ) : (
                                            <Home size={20} />
                                        )}
                                    </div>

                                    <div>
                                        <p
                                            className="text-uppercase mb-1"
                                            style={{
                                                fontSize: "8px",
                                                letterSpacing: "1.7px",
                                                color: "#aaa",
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
                                                fontSize: "19px",
                                                letterSpacing: "-0.2px",
                                            }}
                                        >
                                            {isEditing
                                                ? "Update your address"
                                                : "Add a new address"}
                                        </h4>
                                    </div>
                                </div>

                                <p
                                    className="mb-0 mt-3"
                                    style={{
                                        color: "#bdbdbd",
                                        fontSize: "11px",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {isEditing
                                        ? "Keep your saved delivery details accurate."
                                        : "Save your delivery details for a faster checkout experience."}
                                </p>
                            </motion.div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.045,
                                            },
                                        },
                                    }}
                                    style={{
                                        background: "#ffffff",
                                        border: "1px solid #ededed",
                                        borderRadius: "18px",
                                        padding: "26px",
                                        boxShadow:
                                            "0 8px 30px rgba(0,0,0,0.035)",
                                    }}
                                >
                                    {/* Section Heading */}
                                    <div className="mb-4">
                                        <div
                                            className="d-flex align-items-center gap-2"
                                            style={{
                                                color: "#111",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: "4px",
                                                    height: "17px",
                                                    borderRadius: "10px",
                                                    background: "#ff5a1f",
                                                }}
                                            />

                                            <h6
                                                className="mb-0 fw-bold"
                                                style={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                Address Details
                                            </h6>
                                        </div>

                                        <p
                                            className="mb-0 mt-1"
                                            style={{
                                                marginLeft: "12px",
                                                fontSize: "10px",
                                                color: "#999",
                                            }}
                                        >
                                            Enter the information used for
                                            delivery.
                                        </p>
                                    </div>

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
                                                className="form-label mb-2"
                                                style={{
                                                    fontSize: "11px",
                                                    color: "#222",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Address
                                            </label>

                                            <div className="position-relative">
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        left: "14px",
                                                        top: "14px",
                                                        color: errors.addressLine
                                                            ? "#c94b4b"
                                                            : "#999",
                                                        pointerEvents: "none",
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <MapPin
                                                        size={16}
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                <textarea
                                                    id="addressLine"
                                                    name="addressLine"
                                                    value={
                                                        formData.addressLine
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="House no., street, area, landmark"
                                                    rows="3"
                                                    className="form-control"
                                                    style={{
                                                        minHeight: "88px",
                                                        paddingLeft: "42px",
                                                        paddingTop: "13px",
                                                        paddingRight: "14px",
                                                        borderRadius: "12px",
                                                        border: errors.addressLine
                                                            ? "1px solid #df9b9b"
                                                            : "1px solid #e5e5e5",
                                                        background: "#fbfbfb",
                                                        fontSize: "12px",
                                                        color: "#222",
                                                        resize: "vertical",
                                                        boxShadow: "none",
                                                        transition:
                                                            "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                                                    }}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.background =
                                                            "#fff";
                                                        e.currentTarget.style.borderColor =
                                                            errors.addressLine
                                                                ? "#df9b9b"
                                                                : "#ff5a1f";
                                                        e.currentTarget.style.boxShadow =
                                                            errors.addressLine
                                                                ? "0 0 0 3px rgba(201,75,75,0.08)"
                                                                : "0 0 0 3px rgba(255,90,31,0.08)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.background =
                                                            "#fbfbfb";
                                                        e.currentTarget.style.borderColor =
                                                            errors.addressLine
                                                                ? "#df9b9b"
                                                                : "#e5e5e5";
                                                        e.currentTarget.style.boxShadow =
                                                            "none";
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
                                                            fontSize: "10px",
                                                            fontWeight: "500",
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
                                            placeholder: "Enter city",
                                            icon: Building2,
                                        })}

                                        {renderField({
                                            name: "state",
                                            label: "State",
                                            placeholder: "Enter state",
                                            icon: Map,
                                        })}

                                        {renderField({
                                            name: "pincode",
                                            label: "PIN Code",
                                            placeholder: "6-digit PIN code",
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
                                                    borderRadius: "11px",
                                                    background: "#f0faf4",
                                                    border: "1px solid #ccebd8",
                                                    color: "#287a4b",
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                <CheckCircle2 size={16} />
                                                {successMessage}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Actions */}
                                    <motion.div
                                        className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-5 pt-4"
                                        variants={fieldVariants}
                                        style={{
                                            borderTop: "1px solid #eeeeee",
                                        }}
                                    >
                                        <motion.button
                                            type="button"
                                            onClick={onCancel}
                                            className="btn d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                minHeight: "44px",
                                                padding: "0 19px",
                                                borderRadius: "11px",
                                                border: "1px solid #e3e3e3",
                                                background: "#fff",
                                                color: "#555",
                                                fontSize: "11px",
                                                fontWeight: "600",
                                            }}
                                            whileHover={{
                                                background: "#f7f7f7",
                                                y: -1,
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
                                                minHeight: "44px",
                                                padding: "0 21px",
                                                borderRadius: "11px",
                                                border: "none",
                                                background: "#111",
                                                color: "#fff",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                                opacity: isSaving ? 0.75 : 1,
                                            }}
                                            whileHover={
                                                !isSaving
                                                    ? {
                                                          y: -2,
                                                          boxShadow:
                                                              "0 9px 22px rgba(0,0,0,0.16)",
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
                                            {isSaving ? (
                                                <>
                                                    <motion.span
                                                        animate={{
                                                            rotate: 360,
                                                        }}
                                                        transition={{
                                                            duration: 0.8,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        }}
                                                        style={{
                                                            display: "inline-flex",
                                                        }}
                                                    >
                                                        <Save size={15} />
                                                    </motion.span>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={15} />
                                                    {isEditing
                                                        ? "Update Address"
                                                        : "Save Address"}
                                                </>
                                            )}
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