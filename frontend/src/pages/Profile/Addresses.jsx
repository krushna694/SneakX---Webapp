import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Plus,
} from "lucide-react";
import AddressCard from "../../features/address/components/AddressCard";
import AddressForm from "../../features/address/components/AddressForm";
import { useAddress } from "../../features/address/hooks/useAddress";

function Addresses() {
    const { addresses } = useAddress();

    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

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
        <div className="container py-5">

            {/* Page Header */}
            <motion.div
                className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <MapPin size={25} />

                        <h2 className="mb-0 fw-bold">
                            My Addresses
                        </h2>
                    </div>

                    <p className="text-muted mb-0">
                        Manage your saved delivery addresses.
                    </p>
                </div>

                {!showForm && (
                    <motion.button
                        type="button"
                        className="btn btn-dark d-flex align-items-center justify-content-center gap-2"
                        onClick={handleAddAddress}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Plus size={18} />
                        Add New Address
                    </motion.button>
                )}
            </motion.div>

            {/* Address Form */}
            <AnimatePresence mode="wait">
                {showForm && (
                    <motion.div
                        key={editingAddress?.id ?? "new-address"}
                        initial={{
                            opacity: 0,
                            height: 0,
                            y: -15,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            y: -15,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                        }}
                    >
                        <AddressForm
                            key={editingAddress?.id ?? "new"}
                            editingAddress={editingAddress}
                            onCancel={handleCancel}
                            onSuccess={handleSuccess}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Address List */}
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
                            transition={{
                                duration: 0.35,
                            }}
                        >
                            <AddressCard
                                address={address}
                                onEdit={handleEditAddress}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                /* Empty State */
                !showForm && (
                    <motion.div
                        className="text-center py-5"
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="mb-3">
                            <MapPin
                                size={48}
                                strokeWidth={1.4}
                            />
                        </div>

                        <h4 className="fw-semibold">
                            No saved addresses
                        </h4>

                        <p className="text-muted mb-4">
                            Add an address to make checkout
                            faster and easier.
                        </p>

                        <motion.button
                            type="button"
                            className="btn btn-dark d-inline-flex align-items-center gap-2"
                            onClick={handleAddAddress}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Plus size={18} />
                            Add Your First Address
                        </motion.button>
                    </motion.div>
                )
            )}

        </div>
    );
}

export default Addresses;