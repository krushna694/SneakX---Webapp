import { useState } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
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

    const [formData, setFormData] = useState(() => {
        if (editingAddress) {
            return {
                label: editingAddress.label || "",
                fullName: editingAddress.fullName || "",
                addressLine: editingAddress.addressLine || "",
                city: editingAddress.city || "",
                state: editingAddress.state || "",
                pincode: editingAddress.pincode || "",
                phone: editingAddress.phone || "",
            };
        }

        return initialForm;
    });

    const [errors, setErrors] = useState({});

    const isEditing = Boolean(editingAddress);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.label.trim()) {
            newErrors.label = "Address label is required.";
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
            newErrors.pincode = "Enter a valid 6-digit PIN code.";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        if (isEditing) {
            updateAddress(editingAddress.id, formData);
        } else {
            addAddress(formData);
        }

        setFormData(initialForm);
        setErrors({});

        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <motion.div
            className="card border-0 shadow-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <div className="card-body p-4">

                {/* Header */}
                <motion.div
                    className="d-flex justify-content-between align-items-center mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <div>
                        <h5 className="mb-1 fw-semibold">
                            {isEditing
                                ? "Edit Address"
                                : "Add New Address"}
                        </h5>

                        <p className="text-muted small mb-0">
                            {isEditing
                                ? "Update your saved address details."
                                : "Add a delivery address to your account."}
                        </p>
                    </div>

                    {onCancel && (
                        <motion.button
                            type="button"
                            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
                            onClick={onCancel}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <X size={16} />
                            Cancel
                        </motion.button>
                    )}
                </motion.div>

                <form onSubmit={handleSubmit}>

                    {/* Address Label */}
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12, duration: 0.3 }}
                    >
                        <label
                            htmlFor="address-label"
                            className="form-label fw-medium"
                        >
                            Address Label
                        </label>

                        <input
                            id="address-label"
                            type="text"
                            name="label"
                            className={`form-control ${errors.label ? "is-invalid" : ""
                                }`}
                            placeholder="Home / Office"
                            value={formData.label}
                            onChange={handleChange}
                        />

                        {errors.label && (
                            <div className="invalid-feedback">
                                {errors.label}
                            </div>
                        )}
                    </motion.div>

                    {/* Full Name */}
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16, duration: 0.3 }}
                    >
                        <label
                            htmlFor="full-name"
                            className="form-label fw-medium"
                        >
                            Full Name
                        </label>

                        <input
                            id="full-name"
                            type="text"
                            name="fullName"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""
                                }`}
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        {errors.fullName && (
                            <div className="invalid-feedback">
                                {errors.fullName}
                            </div>
                        )}
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <label
                            htmlFor="address-line"
                            className="form-label fw-medium"
                        >
                            Address
                        </label>

                        <textarea
                            id="address-line"
                            name="addressLine"
                            rows="3"
                            className={`form-control ${errors.addressLine ? "is-invalid" : ""
                                }`}
                            placeholder="House/Flat No., Street, Area"
                            value={formData.addressLine}
                            onChange={handleChange}
                        />

                        {errors.addressLine && (
                            <div className="invalid-feedback">
                                {errors.addressLine}
                            </div>
                        )}
                    </motion.div>

                    {/* City + State */}
                    <div className="row">

                        {/* City */}
                        <motion.div
                            className="col-md-6 mb-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.24,
                                duration: 0.3,
                            }}
                        >
                            <label
                                htmlFor="city"
                                className="form-label fw-medium"
                            >
                                City
                            </label>

                            <input
                                id="city"
                                type="text"
                                name="city"
                                className={`form-control ${errors.city ? "is-invalid" : ""
                                    }`}
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            {errors.city && (
                                <div className="invalid-feedback">
                                    {errors.city}
                                </div>
                            )}
                        </motion.div>

                        {/* State */}
                        <motion.div
                            className="col-md-6 mb-3"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.24,
                                duration: 0.3,
                            }}
                        >
                            <label
                                htmlFor="state"
                                className="form-label fw-medium"
                            >
                                State
                            </label>

                            <input
                                id="state"
                                type="text"
                                name="state"
                                className={`form-control ${errors.state ? "is-invalid" : ""
                                    }`}
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={handleChange}
                            />

                            {errors.state && (
                                <div className="invalid-feedback">
                                    {errors.state}
                                </div>
                            )}
                        </motion.div>

                    </div>

                    {/* PIN + Phone */}
                    <div className="row">

                        {/* PIN Code */}
                        <motion.div
                            className="col-md-6 mb-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.28,
                                duration: 0.3,
                            }}
                        >
                            <label
                                htmlFor="pincode"
                                className="form-label fw-medium"
                            >
                                PIN Code
                            </label>

                            <input
                                id="pincode"
                                type="text"
                                name="pincode"
                                maxLength="6"
                                inputMode="numeric"
                                className={`form-control ${errors.pincode ? "is-invalid" : ""
                                    }`}
                                placeholder="6-digit PIN code"
                                value={formData.pincode}
                                onChange={handleChange}
                            />

                            {errors.pincode && (
                                <div className="invalid-feedback">
                                    {errors.pincode}
                                </div>
                            )}
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            className="col-md-6 mb-3"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.28,
                                duration: 0.3,
                            }}
                        >
                            <label
                                htmlFor="phone"
                                className="form-label fw-medium"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                maxLength="10"
                                inputMode="numeric"
                                className={`form-control ${errors.phone ? "is-invalid" : ""
                                    }`}
                                placeholder="10-digit phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {errors.phone && (
                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>
                            )}
                        </motion.div>

                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        className="btn btn-dark d-flex align-items-center gap-2"
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                    >
                        <Save size={17} />

                        {isEditing
                            ? "Update Address"
                            : "Save Address"}
                    </motion.button>

                </form>
            </div>
        </motion.div>
    );
}

export default AddressForm;