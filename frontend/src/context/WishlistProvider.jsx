import { useCallback, useEffect, useState } from "react";
import { WishlistContext } from "./WishlistContext";

import {
    getWishlistApi,
    addToWishlistApi,
    removeFromWishlistApi,
} from "../api/wishlistApi";

function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [wishlistError, setWishlistError] = useState(null);

    // ==========================================
    // RESET WISHLIST STATE
    // ==========================================

    const resetWishlistState = useCallback(() => {
        setWishlistItems([]);
        setWishlistError(null);
    }, []);

    // ==========================================
    // NORMALIZE BACKEND WISHLIST
    // ==========================================

    const normalizeWishlist = useCallback((response) => {
        /*
         * Backend response is expected to contain
         * the wishlist items.
         *
         * We keep the frontend state as an array
         * of product objects so existing UI components
         * continue to work.
         */

        if (Array.isArray(response)) {
            return response;
        }

        if (Array.isArray(response?.data)) {
            return response.data;
        }

        if (Array.isArray(response?.data?.items)) {
            return response.data.items;
        }

        if (Array.isArray(response?.items)) {
            return response.items;
        }

        return [];
    }, []);

    // ==========================================
    // LOAD WISHLIST FROM BACKEND
    // ==========================================

    const loadWishlist = useCallback(async () => {
        const token = localStorage.getItem("sneakx_token");

        if (!token) {
            resetWishlistState();
            return;
        }

        try {
            setWishlistLoading(true);
            setWishlistError(null);

            const response = await getWishlistApi();

            // Make sure the user did not logout
            // while the request was running.
            const currentToken =
                localStorage.getItem("sneakx_token");

            if (!currentToken) {
                resetWishlistState();
                return;
            }

            const normalizedWishlist =
                normalizeWishlist(response);

            setWishlistItems(normalizedWishlist);
        } catch (error) {
            console.error(
                "Failed to load wishlist:",
                error
            );

            setWishlistError(
                error?.response?.data?.message ||
                "Failed to load wishlist"
            );
        } finally {
            setWishlistLoading(false);
        }
    }, [normalizeWishlist, resetWishlistState]);

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        const token =
            localStorage.getItem("sneakx_token");

        if (!token) {
            return;
        }

        const timer = setTimeout(() => {
            loadWishlist();
        }, 0);

        return () => clearTimeout(timer);
    }, [loadWishlist]);

    // ==========================================
    // AUTHENTICATION SYNCHRONIZATION
    // ==========================================

    useEffect(() => {
        const handleAuthChange = (event) => {
            const action = event?.detail?.action;

            if (action === "login") {
                setTimeout(() => {
                    loadWishlist();
                }, 0);
            }

            if (action === "logout") {
                resetWishlistState();
            }
        };

        window.addEventListener(
            "sneakx_auth_changed",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "sneakx_auth_changed",
                handleAuthChange
            );
        };
    }, [loadWishlist, resetWishlistState]);

    // ==========================================
    // ADD TO WISHLIST
    // ==========================================

    const addToWishlist = async (product) => {
        if (!product?.id) {
            console.error(
                "Cannot add product without an ID"
            );
            return;
        }

        try {
            setWishlistError(null);

            const response =
                await addToWishlistApi(product.id);

            const updatedWishlist =
                normalizeWishlist(response);

            setWishlistItems(updatedWishlist);

            return response;
        } catch (error) {
            console.error(
                "Failed to add product to wishlist:",
                error
            );

            setWishlistError(
                error?.response?.data?.message ||
                "Failed to add product to wishlist"
            );

            throw error;
        }
    };

    // ==========================================
    // REMOVE FROM WISHLIST
    // ==========================================

    const removeFromWishlist = async (productId) => {
        if (!productId) {
            return;
        }

        try {
            setWishlistError(null);

            const response =
                await removeFromWishlistApi(productId);

            const updatedWishlist =
                normalizeWishlist(response);

            setWishlistItems(updatedWishlist);

            return response;
        } catch (error) {
            console.error(
                "Failed to remove product from wishlist:",
                error
            );

            setWishlistError(
                error?.response?.data?.message ||
                "Failed to remove product from wishlist"
            );

            throw error;
        }
    };

    // ==========================================
    // CHECK WISHLIST
    // ==========================================

    const isInWishlist = (productId) => {
        return wishlistItems.some(
            (item) => item?.id === productId
        );
    };

    // ==========================================
    // CLEAR LOCAL STATE
    // ==========================================

    const clearWishlist = () => {
        resetWishlistState();
    };

    // ==========================================
    // WISHLIST COUNT
    // ==========================================

    const wishlistCount =
        wishlistItems.length;

    // ==========================================
    // CONTEXT
    // ==========================================

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount,

                wishlistLoading,
                wishlistError,

                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,

                loadWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;