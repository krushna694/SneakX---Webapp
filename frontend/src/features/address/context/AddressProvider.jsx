import {
    useCallback,
    useEffect,
    useState,
} from "react";

import AddressContext from "./AddressContext";

import {
    getAddressesApi,
    createAddressApi,
    updateAddressApi,
    deleteAddressApi,
    setDefaultAddressApi,
} from "../../../api/addressApi";

function AddressProvider({ children }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /**
     * Normalize backend address response
     * to the existing frontend address structure.
     *
     * Backend:
     *     defaultAddress
     *
     * Existing frontend:
     *     isDefault
     */
    const normalizeAddress = (address) => ({
        ...address,
        isDefault: Boolean(address.defaultAddress),
    });

    /**
     * Reset frontend address state.
     *
     * This does NOT delete addresses from the backend.
     */
    const resetAddressState = () => {
        setAddresses([]);
        setError("");
    };

    /**
     * Load all addresses from backend.
     *
     * Backend is the source of truth.
     */
    const loadAddresses = useCallback(async () => {
        const token = localStorage.getItem("sneakx_token");

        if (!token) {
            setAddresses([]);
            setError("");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await getAddressesApi();

            /*
             * The user could have logged out while
             * the request was running.
             */
            const latestToken =
                localStorage.getItem("sneakx_token");

            if (!latestToken) {
                setAddresses([]);
                setError("");
                return;
            }

            const data =
                response?.data ??
                response ??
                [];

            setAddresses(
                Array.isArray(data)
                    ? data.map(normalizeAddress)
                    : []
            );
        } catch (err) {
            console.error(
                "Failed to load addresses:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to load addresses.";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Load addresses when provider mounts
     * if the user is already authenticated.
     */
    useEffect(() => {
        const token =
            localStorage.getItem("sneakx_token");

        if (!token) {
            return;
        }

        const timer = setTimeout(() => {
            loadAddresses();
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [loadAddresses]);

    /**
     * Keep address state synchronized with authentication.
     *
     * Login  -> fetch backend addresses
     * Logout -> clear frontend address state
     */
    useEffect(() => {
        const handleAuthChange = (event) => {
            const action =
                event?.detail?.action;

            if (action === "login") {
                setTimeout(() => {
                    loadAddresses();
                }, 0);
            }

            if (action === "logout") {
                resetAddressState();
            }
        };

        const handleStorageChange = (event) => {
            if (event.key !== "sneakx_token") {
                return;
            }

            if (event.newValue) {
                setTimeout(() => {
                    loadAddresses();
                }, 0);
            } else {
                resetAddressState();
            }
        };

        window.addEventListener(
            "sneakx_auth_changed",
            handleAuthChange
        );

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {
            window.removeEventListener(
                "sneakx_auth_changed",
                handleAuthChange
            );

            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };
    }, [loadAddresses]);

    /**
     * Add a new address.
     */
    const addAddress = async (addressData) => {
        try {
            setError("");

            const response =
                await createAddressApi(
                    addressData
                );

            const data =
                response?.data ??
                response;

            const newAddress =
                normalizeAddress(data);

            /*
             * Reload the complete list because
             * the backend controls default-address
             * business rules.
             */
            await loadAddresses();

            return {
                success: true,
                message:
                    response?.message ||
                    "Address added successfully.",
                address: newAddress,
            };
        } catch (err) {
            console.error(
                "Failed to add address:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to add address.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    /**
     * Update an existing address.
     */
    const updateAddress = async (
        id,
        updatedAddress
    ) => {
        try {
            setError("");

            const response =
                await updateAddressApi(
                    id,
                    updatedAddress
                );

            const data =
                response?.data ??
                response;

            const updated =
                normalizeAddress(data);

            /*
             * Reload complete list because the
             * backend controls default-address rules.
             */
            await loadAddresses();

            return {
                success: true,
                message:
                    response?.message ||
                    "Address updated successfully.",
                address: updated,
            };
        } catch (err) {
            console.error(
                "Failed to update address:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to update address.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    /**
     * Delete an address.
     */
    const deleteAddress = async (id) => {
        try {
            setError("");

            const response =
                await deleteAddressApi(id);

            /*
             * If the deleted address was default,
             * the backend automatically promotes
             * another address.
             *
             * Reload to reflect that backend state.
             */
            await loadAddresses();

            return {
                success: true,
                message:
                    response?.message ||
                    "Address deleted successfully.",
            };
        } catch (err) {
            console.error(
                "Failed to delete address:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to delete address.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    /**
     * Set an address as the default address.
     */
    const setDefaultAddress = async (id) => {
        try {
            setError("");

            const response =
                await setDefaultAddressApi(id);

            /*
             * Backend guarantees that only one
             * address is default.
             */
            await loadAddresses();

            return {
                success: true,
                message:
                    response?.message ||
                    "Default address updated successfully.",
            };
        } catch (err) {
            console.error(
                "Failed to set default address:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Failed to update default address.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    /**
     * Get the current default address.
     */
    const getDefaultAddress = () => {
        return addresses.find(
            (address) => address.isDefault
        );
    };

    /**
     * Get an address by ID.
     */
    const getAddressById = (id) => {
        return addresses.find(
            (address) =>
                String(address.id) ===
                String(id)
        );
    };

    /**
     * Clear frontend address state.
     *
     * Used mainly after logout.
     */
    const clearAddresses = () => {
        resetAddressState();
    };

    const value = {
        addresses,

        loading,
        error,

        loadAddresses,

        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,

        getDefaultAddress,
        getAddressById,

        clearAddresses,
    };

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressProvider;