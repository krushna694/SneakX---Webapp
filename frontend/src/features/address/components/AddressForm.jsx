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
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "HOME",
    defaultAddress: false,
};


function AddressForm({
    editingAddress,
    onCancel,
    onSuccess,
}) {
    const {
        addAddress,
        updateAddress,
    } = useAddress();


    const [formData, setFormData] = useState(() =>
        editingAddress
            ? {
                fullName:
                    editingAddress.fullName || "",

                phone:
                    editingAddress.phone || "",

                addressLine1:
                    editingAddress.addressLine1 ||
                    editingAddress.addressLine ||
                    "",

                addressLine2:
                    editingAddress.addressLine2 || "",

                city:
                    editingAddress.city || "",

                state:
                    editingAddress.state || "",

                postalCode:
                    editingAddress.postalCode ||
                    editingAddress.pincode ||
                    "",

                country:
                    editingAddress.country ||
                    "India",

                addressType:
                    editingAddress.addressType ||
                    "HOME",

                defaultAddress:
                    Boolean(
                        editingAddress.defaultAddress ??
                        editingAddress.isDefault
                    ),
            }
            : initialForm
    );


    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] =
        useState("");
    const [apiError, setApiError] = useState("");


    const isEditing = Boolean(editingAddress);


    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));


        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }


        if (apiError) {
            setApiError("");
        }
    };


    const validate = () => {
        const newErrors = {};


        if (!formData.fullName.trim()) {
            newErrors.fullName =
                "Full name is required.";
        } else if (
            formData.fullName.trim().length > 150
        ) {
            newErrors.fullName =
                "Full name cannot exceed 150 characters.";
        }


        if (!formData.phone.trim()) {
            newErrors.phone =
                "Phone number is required.";
        } else if (
            !/^[0-9+\-\s()]{7,20}$/.test(
                formData.phone.trim()
            )
        ) {
            newErrors.phone =
                "Please enter a valid phone number.";
        }


        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 =
                "Address is required.";
        } else if (
            formData.addressLine1.trim().length > 255
        ) {
            newErrors.addressLine1 =
                "Address cannot exceed 255 characters.";
        }


        if (
            formData.addressLine2.trim().length >
            255
        ) {
            newErrors.addressLine2 =
                "Address line 2 cannot exceed 255 characters.";
        }


        if (!formData.city.trim()) {
            newErrors.city =
                "City is required.";
        } else if (
            formData.city.trim().length > 100
        ) {
            newErrors.city =
                "City cannot exceed 100 characters.";
        }


        if (!formData.state.trim()) {
            newErrors.state =
                "State is required.";
        } else if (
            formData.state.trim().length > 100
        ) {
            newErrors.state =
                "State cannot exceed 100 characters.";
        }


        if (!formData.postalCode.trim()) {
            newErrors.postalCode =
                "PIN code is required.";
        } else if (
            !/^\d{6}$/.test(
                formData.postalCode.trim()
            )
        ) {
            newErrors.postalCode =
                "PIN code must contain exactly 6 digits.";
        }


        if (!formData.country.trim()) {
            newErrors.country =
                "Country is required.";
        } else if (
            formData.country.trim().length > 100
        ) {
            newErrors.country =
                "Country cannot exceed 100 characters.";
        }


        if (
            ![
                "HOME",
                "WORK",
                "OTHER",
            ].includes(formData.addressType)
        ) {
            newErrors.addressType =
                "Please select an address type.";
        }


        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!validate()) {
            return;
        }


        setIsSaving(true);
        setApiError("");
        setSuccessMessage("");


        const payload = {
            fullName:
                formData.fullName.trim(),

            phone:
                formData.phone.trim(),

            addressLine1:
                formData.addressLine1.trim(),

            addressLine2:
                formData.addressLine2.trim() ||
                null,

            city:
                formData.city.trim(),

            state:
                formData.state.trim(),

            postalCode:
                formData.postalCode.trim(),

            country:
                formData.country.trim() ||
                "India",

            addressType:
                formData.addressType,

            defaultAddress:
                Boolean(formData.defaultAddress),
        };


        try {
            let result;


            if (isEditing) {
                result =
                    await updateAddress(
                        editingAddress.id,
                        payload
                    );
            } else {
                result =
                    await addAddress(payload);
            }


            if (!result?.success) {
                setApiError(
                    result?.message ||
                    "Unable to save address. Please try again."
                );

                return;
            }


            setSuccessMessage(
                isEditing
                    ? "Address updated successfully."
                    : "Address added successfully."
            );


            setTimeout(() => {
                onSuccess();
            }, 700);
        } catch (error) {
            console.error(
                "Address save failed:",
                error
            );


            setApiError(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to save address. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
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
                    transition:
                        "all 0.2s ease",
                }}
            >
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        left: "14px",
                        top: "50%",
                        transform:
                            "translateY(-50%)",
                        color: errors[name]
                            ? "#c94b4b"
                            : "#999",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                >
                    <Icon
                        size={16}
                        strokeWidth={1.8}
                    />
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
                        e.currentTarget.style.background =
                            "#ffffff";

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
                        e.currentTarget.style.background =
                            "#fbfbfb";

                        e.currentTarget.style.borderColor =
                            errors[name]
                                ? "#df9b9b"
                                : "#e5e5e5";

                        e.currentTarget.style.boxShadow =
                            "none";
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


    const renderSelect = ({
        name,
        label,
        icon: Icon,
        children,
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
                }}
            >
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        left: "14px",
                        top: "50%",
                        transform:
                            "translateY(-50%)",
                        color: errors[name]
                            ? "#c94b4b"
                            : "#999",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                >
                    <Icon
                        size={16}
                        strokeWidth={1.8}
                    />
                </div>


                <select
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-select"
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
                        cursor: "pointer",
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.background =
                            "#ffffff";

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
                        e.currentTarget.style.background =
                            "#fbfbfb";

                        e.currentTarget.style.borderColor =
                            errors[name]
                                ? "#df9b9b"
                                : "#e5e5e5";

                        e.currentTarget.style.boxShadow =
                            "none";
                    }}
                >
                    {children}
                </select>
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
                    background:
                        "rgba(0,0,0,0.68)",
                    backdropFilter:
                        "blur(10px)",
                    WebkitBackdropFilter:
                        "blur(10px)",
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
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
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
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >

                    {/* Header */}

                    <div
                        className="d-flex align-items-center justify-content-between px-4 px-md-5"
                        style={{
                            minHeight: "64px",
                            flexShrink: 0,
                            background: "#ffffff",
                            borderBottom:
                                "1px solid #eeeeee",
                        }}
                    >
                        <div className="d-flex align-items-center gap-2">

                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "9px",
                                    background:
                                        "#fff3ed",
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
                                        letterSpacing:
                                            "1.5px",
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
                                        marginTop:
                                            "2px",
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
                                border:
                                    "1px solid #e6e6e6",
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
                                    padding:
                                        "22px 24px",
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
                                            borderRadius:
                                                "12px",
                                            background:
                                                "#fff",
                                            color: "#111",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {isEditing ? (
                                            <MapPin
                                                size={20}
                                            />
                                        ) : (
                                            <Home
                                                size={20}
                                            />
                                        )}
                                    </div>


                                    <div>
                                        <p
                                            className="text-uppercase mb-1"
                                            style={{
                                                fontSize:
                                                    "8px",
                                                letterSpacing:
                                                    "1.7px",
                                                color: "#aaa",
                                                fontWeight:
                                                    "700",
                                            }}
                                        >
                                            {isEditing
                                                ? "Manage Address"
                                                : "New Delivery Address"}
                                        </p>


                                        <h4
                                            className="fw-bold mb-0"
                                            style={{
                                                fontSize:
                                                    "19px",
                                                letterSpacing:
                                                    "-0.2px",
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
                                                staggerChildren:
                                                    0.045,
                                            },
                                        },
                                    }}
                                    style={{
                                        background:
                                            "#ffffff",
                                        border:
                                            "1px solid #ededed",
                                        borderRadius:
                                            "18px",
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
                                                    borderRadius:
                                                        "10px",
                                                    background:
                                                        "#ff5a1f",
                                                }}
                                            />


                                            <h6
                                                className="mb-0 fw-bold"
                                                style={{
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                Address Details
                                            </h6>
                                        </div>


                                        <p
                                            className="mb-0 mt-1"
                                            style={{
                                                marginLeft:
                                                    "12px",
                                                fontSize:
                                                    "10px",
                                                color: "#999",
                                            }}
                                        >
                                            Enter the information used for
                                            delivery.
                                        </p>

                                    </div>


                                    <div className="row g-4">

                                        {/* Address Type */}

                                        {renderSelect({
                                            name: "addressType",
                                            label: "Address Type",
                                            icon: Home,
                                            children: (
                                                <>
                                                    <option value="HOME">
                                                        Home
                                                    </option>

                                                    <option value="WORK">
                                                        Work
                                                    </option>

                                                    <option value="OTHER">
                                                        Other
                                                    </option>
                                                </>
                                            ),
                                        })}


                                        {/* Full Name */}

                                        {renderField({
                                            name: "fullName",
                                            label: "Full Name",
                                            placeholder:
                                                "Enter recipient name",
                                            icon: User,
                                            maxLength: 150,
                                        })}


                                        {/* Phone */}

                                        {renderField({
                                            name: "phone",
                                            label: "Phone Number",
                                            placeholder:
                                                "10-digit mobile number",
                                            icon: Phone,
                                            maxLength: 20,
                                        })}


                                        {/* Country */}

                                        {renderField({
                                            name: "country",
                                            label: "Country",
                                            placeholder:
                                                "Enter country",
                                            icon: Map,
                                            maxLength: 100,
                                        })}


                                        {/* Address Line 1 */}

                                        <motion.div
                                            className="col-12"
                                            variants={
                                                fieldVariants
                                            }
                                        >
                                            <label
                                                htmlFor="addressLine1"
                                                className="form-label mb-2"
                                                style={{
                                                    fontSize:
                                                        "11px",
                                                    color: "#222",
                                                    fontWeight:
                                                        "700",
                                                }}
                                            >
                                                Address Line 1
                                            </label>


                                            <div className="position-relative">

                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        left: "14px",
                                                        top: "14px",
                                                        color:
                                                            errors.addressLine1
                                                                ? "#c94b4b"
                                                                : "#999",
                                                        pointerEvents:
                                                            "none",
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <MapPin
                                                        size={16}
                                                        strokeWidth={
                                                            1.8
                                                        }
                                                    />
                                                </div>


                                                <textarea
                                                    id="addressLine1"
                                                    name="addressLine1"
                                                    value={
                                                        formData.addressLine1
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    placeholder="House no., street, area, landmark"
                                                    rows="3"
                                                    maxLength={
                                                        255
                                                    }
                                                    className="form-control"
                                                    style={{
                                                        minHeight:
                                                            "88px",
                                                        paddingLeft:
                                                            "42px",
                                                        paddingTop:
                                                            "13px",
                                                        paddingRight:
                                                            "14px",
                                                        borderRadius:
                                                            "12px",
                                                        border:
                                                            errors.addressLine1
                                                                ? "1px solid #df9b9b"
                                                                : "1px solid #e5e5e5",
                                                        background:
                                                            "#fbfbfb",
                                                        fontSize:
                                                            "12px",
                                                        color: "#222",
                                                        resize:
                                                            "vertical",
                                                        boxShadow:
                                                            "none",
                                                        transition:
                                                            "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                                                    }}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.background =
                                                            "#fff";

                                                        e.currentTarget.style.borderColor =
                                                            errors.addressLine1
                                                                ? "#df9b9b"
                                                                : "#ff5a1f";

                                                        e.currentTarget.style.boxShadow =
                                                            errors.addressLine1
                                                                ? "0 0 0 3px rgba(201,75,75,0.08)"
                                                                : "0 0 0 3px rgba(255,90,31,0.08)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.background =
                                                            "#fbfbfb";

                                                        e.currentTarget.style.borderColor =
                                                            errors.addressLine1
                                                                ? "#df9b9b"
                                                                : "#e5e5e5";

                                                        e.currentTarget.style.boxShadow =
                                                            "none";
                                                    }}
                                                />

                                            </div>


                                            <AnimatePresence>
                                                {errors.addressLine1 && (
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
                                                            fontWeight:
                                                                "500",
                                                        }}
                                                    >
                                                        {
                                                            errors.addressLine1
                                                        }
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </motion.div>


                                        {/* Address Line 2 */}

                                        <motion.div
                                            className="col-12"
                                            variants={
                                                fieldVariants
                                            }
                                        >
                                            <label
                                                htmlFor="addressLine2"
                                                className="form-label mb-2"
                                                style={{
                                                    fontSize:
                                                        "11px",
                                                    color: "#222",
                                                    fontWeight:
                                                        "700",
                                                }}
                                            >
                                                Address Line 2
                                                <span
                                                    style={{
                                                        color:
                                                            "#999",
                                                        fontWeight:
                                                            "500",
                                                        marginLeft:
                                                            "5px",
                                                    }}
                                                >
                                                    Optional
                                                </span>
                                            </label>


                                            <textarea
                                                id="addressLine2"
                                                name="addressLine2"
                                                value={
                                                    formData.addressLine2
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="Apartment, floor, building, landmark"
                                                rows="2"
                                                maxLength={
                                                    255
                                                }
                                                className="form-control"
                                                style={{
                                                    minHeight:
                                                        "70px",
                                                    paddingTop:
                                                        "13px",
                                                    paddingRight:
                                                        "14px",
                                                    borderRadius:
                                                        "12px",
                                                    border:
                                                        errors.addressLine2
                                                            ? "1px solid #df9b9b"
                                                            : "1px solid #e5e5e5",
                                                    background:
                                                        "#fbfbfb",
                                                    fontSize:
                                                        "12px",
                                                    color: "#222",
                                                    resize:
                                                        "vertical",
                                                    boxShadow:
                                                        "none",
                                                    transition:
                                                        "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.background =
                                                        "#fff";

                                                    e.currentTarget.style.borderColor =
                                                        errors.addressLine2
                                                            ? "#df9b9b"
                                                            : "#ff5a1f";

                                                    e.currentTarget.style.boxShadow =
                                                        errors.addressLine2
                                                            ? "0 0 0 3px rgba(201,75,75,0.08)"
                                                            : "0 0 0 3px rgba(255,90,31,0.08)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.background =
                                                        "#fbfbfb";

                                                    e.currentTarget.style.borderColor =
                                                        errors.addressLine2
                                                            ? "#df9b9b"
                                                            : "#e5e5e5";

                                                    e.currentTarget.style.boxShadow =
                                                        "none";
                                                }}
                                            />


                                            <AnimatePresence>
                                                {errors.addressLine2 && (
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
                                                            fontWeight:
                                                                "500",
                                                        }}
                                                    >
                                                        {
                                                            errors.addressLine2
                                                        }
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </motion.div>


                                        {/* City */}

                                        {renderField({
                                            name: "city",
                                            label: "City",
                                            placeholder:
                                                "Enter city",
                                            icon: Building2,
                                            maxLength: 100,
                                        })}


                                        {/* State */}

                                        {renderField({
                                            name: "state",
                                            label: "State",
                                            placeholder:
                                                "Enter state",
                                            icon: Map,
                                            maxLength: 100,
                                        })}


                                        {/* PIN Code */}

                                        {renderField({
                                            name: "postalCode",
                                            label: "PIN Code",
                                            placeholder:
                                                "6-digit PIN code",
                                            icon: Hash,
                                            maxLength: 6,
                                        })}


                                    </div>


                                    {/* Default Address */}

                                    <motion.div
                                        variants={
                                            fieldVariants
                                        }
                                        className="mt-4"
                                    >
                                        <div
                                            className="d-flex align-items-center justify-content-between gap-3 p-3"
                                            style={{
                                                border:
                                                    "1px solid #ededed",
                                                borderRadius:
                                                    "13px",
                                                background:
                                                    "#fafafa",
                                            }}
                                        >

                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width:
                                                            "34px",
                                                        height:
                                                            "34px",
                                                        borderRadius:
                                                            "10px",
                                                        background:
                                                            formData.defaultAddress
                                                                ? "#fff3ed"
                                                                : "#eeeeee",
                                                        color:
                                                            formData.defaultAddress
                                                                ? "#ff5a1f"
                                                                : "#777",
                                                        flexShrink:
                                                            0,
                                                    }}
                                                >
                                                    <CheckCircle2
                                                        size={17}
                                                        strokeWidth={
                                                            1.8
                                                        }
                                                    />
                                                </div>


                                                <div>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            fontSize:
                                                                "11px",
                                                            fontWeight:
                                                                "700",
                                                            color:
                                                                "#222",
                                                        }}
                                                    >
                                                        Set as default address
                                                    </p>

                                                    <p
                                                        className="mb-0 mt-1"
                                                        style={{
                                                            fontSize:
                                                                "9px",
                                                            color:
                                                                "#999",
                                                        }}
                                                    >
                                                        Use this address automatically
                                                        during checkout.
                                                    </p>
                                                </div>

                                            </div>


                                            <div
                                                className="form-check form-switch m-0"
                                                style={{
                                                    flexShrink:
                                                        0,
                                                }}
                                            >
                                                <input
                                                    id="defaultAddress"
                                                    name="defaultAddress"
                                                    type="checkbox"
                                                    role="switch"
                                                    checked={
                                                        formData.defaultAddress
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className="form-check-input"
                                                    style={{
                                                        cursor:
                                                            "pointer",
                                                        width:
                                                            "38px",
                                                        height:
                                                            "21px",
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </motion.div>


                                    {/* API Error */}

                                    <AnimatePresence>
                                        {apiError && (
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
                                                        "#fff4f4",
                                                    border:
                                                        "1px solid #f0cccc",
                                                    color:
                                                        "#b54545",
                                                    fontSize:
                                                        "11px",
                                                    fontWeight:
                                                        "600",
                                                }}
                                            >
                                                <X
                                                    size={16}
                                                />

                                                {apiError}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>


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
                                                    border:
                                                        "1px solid #ccebd8",
                                                    color:
                                                        "#287a4b",
                                                    fontSize:
                                                        "11px",
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
                                        variants={
                                            fieldVariants
                                        }
                                        style={{
                                            borderTop:
                                                "1px solid #eeeeee",
                                        }}
                                    >

                                        <motion.button
                                            type="button"
                                            onClick={
                                                onCancel
                                            }
                                            disabled={
                                                isSaving
                                            }
                                            className="btn d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                minHeight:
                                                    "44px",
                                                padding:
                                                    "0 19px",
                                                borderRadius:
                                                    "11px",
                                                border:
                                                    "1px solid #e3e3e3",
                                                background:
                                                    "#fff",
                                                color:
                                                    "#555",
                                                fontSize:
                                                    "11px",
                                                fontWeight:
                                                    "600",
                                                opacity:
                                                    isSaving
                                                        ? 0.6
                                                        : 1,
                                            }}
                                            whileHover={
                                                !isSaving
                                                    ? {
                                                        background:
                                                            "#f7f7f7",
                                                        y: -1,
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
                                            <X
                                                size={15}
                                            />

                                            Cancel
                                        </motion.button>


                                        <motion.button
                                            type="submit"
                                            disabled={
                                                isSaving
                                            }
                                            className="btn d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                minHeight:
                                                    "44px",
                                                padding:
                                                    "0 21px",
                                                borderRadius:
                                                    "11px",
                                                border: "none",
                                                background:
                                                    "#111",
                                                color:
                                                    "#fff",
                                                fontSize:
                                                    "11px",
                                                fontWeight:
                                                    "700",
                                                opacity:
                                                    isSaving
                                                        ? 0.75
                                                        : 1,
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
                                                            duration:
                                                                0.8,
                                                            repeat:
                                                                Infinity,
                                                            ease:
                                                                "linear",
                                                        }}
                                                        style={{
                                                            display:
                                                                "inline-flex",
                                                        }}
                                                    >
                                                        <Save
                                                            size={
                                                                15
                                                            }
                                                        />
                                                    </motion.span>

                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save
                                                        size={
                                                            15
                                                        }
                                                    />

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