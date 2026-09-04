import { useEffect, useState } from "react";
import AddressContext from "./AddressContext";

function AddressProvider({ children }) {
    const [addresses, setAddresses] = useState(() => {
        const savedAddresses = localStorage.getItem("sneakx_addresses");

        return savedAddresses
            ? JSON.parse(savedAddresses)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "sneakx_addresses",
            JSON.stringify(addresses)
        );
    }, [addresses]);

    const addAddress = (address) => {
        setAddresses((currentAddresses) => {
            const newAddress = {
                id: Date.now(),
                ...address,
                isDefault: currentAddresses.length === 0,
            };

            return [...currentAddresses, newAddress];
        });

        return {
            success: true,
            message: "Address added successfully.",
        };
    };

    const updateAddress = (id, updatedAddress) => {
        setAddresses((currentAddresses) =>
            currentAddresses.map((address) =>
                address.id === id
                    ? {
                        ...address,
                        ...updatedAddress,
                    }
                    : address
            )
        );

        return {
            success: true,
            message: "Address updated successfully.",
        };
    };

    const deleteAddress = (id) => {
        setAddresses((currentAddresses) => {
            const addressToDelete = currentAddresses.find(
                (address) => address.id === id
            );

            const remainingAddresses = currentAddresses.filter(
                (address) => address.id !== id
            );

            // If the default address is deleted,
            // make the first remaining address default.
            if (
                addressToDelete?.isDefault &&
                remainingAddresses.length > 0
            ) {
                return remainingAddresses.map((address, index) => ({
                    ...address,
                    isDefault: index === 0,
                }));
            }

            return remainingAddresses;
        });

        return {
            success: true,
            message: "Address deleted successfully.",
        };
    };

    const setDefaultAddress = (id) => {
        setAddresses((currentAddresses) =>
            currentAddresses.map((address) => ({
                ...address,
                isDefault: address.id === id,
            }))
        );

        return {
            success: true,
            message: "Default address updated successfully.",
        };
    };

    const getDefaultAddress = () => {
        return addresses.find(
            (address) => address.isDefault
        );
    };

    const getAddressById = (id) => {
        return addresses.find(
            (address) => address.id === id
        );
    };

    const clearAddresses = () => {
        setAddresses([]);
    };

    const value = {
        addresses,
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