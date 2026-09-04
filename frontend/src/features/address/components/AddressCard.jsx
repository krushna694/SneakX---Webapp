import { motion } from "framer-motion";
import {
    MapPin,
    Pencil,
    Trash2,
    Check,
    Star,
} from "lucide-react";
import { useAddress } from "../hooks/useAddress";

function AddressCard({ address, onEdit }) {
    const {
        deleteAddress,
        setDefaultAddress,
    } = useAddress();

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (confirmed) {
            deleteAddress(address.id);
        }
    };

    const handleSetDefault = () => {
        setDefaultAddress(address.id);
    };

    return (
        <motion.div
            className="card h-100 border-0 shadow-sm"
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            whileHover={{
                y: -4,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
            }}
            transition={{
                duration: 0.25,
            }}
        >
            <div className="card-body p-4 d-flex flex-column">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">

                    <div className="d-flex align-items-center gap-2">
                        <MapPin size={20} />

                        <h5 className="mb-0 fw-semibold text-capitalize">
                            {address.label || "Address"}
                        </h5>
                    </div>

                    {/* Default Badge */}
                    {address.isDefault && (
                        <motion.span
                            className="badge text-bg-dark d-flex align-items-center gap-1"
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <Check size={13} />
                            Default
                        </motion.span>
                    )}
                </div>

                {/* Name */}
                <h6 className="fw-semibold mb-2">
                    {address.fullName}
                </h6>

                {/* Address */}
                <p className="text-muted mb-1">
                    {address.addressLine}
                </p>

                {/* City + State */}
                <p className="text-muted mb-1">
                    {address.city}, {address.state}
                </p>

                {/* PIN */}
                <p className="text-muted mb-1">
                    {address.pincode}
                </p>

                {/* Phone */}
                <p className="text-muted mb-4">
                    Phone: {address.phone}
                </p>

                {/* Actions */}
                <div className="d-flex flex-wrap gap-2 mt-auto">

                    {/* Set Default */}
                    {!address.isDefault && (
                        <motion.button
                            type="button"
                            className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                            onClick={handleSetDefault}
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            <Star size={15} />
                            Set as Default
                        </motion.button>
                    )}

                    {/* Edit */}
                    <motion.button
                        type="button"
                        className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                        onClick={() => onEdit(address)}
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        <Pencil size={15} />
                        Edit
                    </motion.button>

                    {/* Delete */}
                    <motion.button
                        type="button"
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                        onClick={handleDelete}
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        <Trash2 size={15} />
                        Delete
                    </motion.button>

                </div>
            </div>
        </motion.div>
    );
}

export default AddressCard;