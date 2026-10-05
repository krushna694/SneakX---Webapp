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
        let items = [];

        /*
         * ApiResponse
         *     ↓
         * data
         *     ↓
         * WishlistResponse
         *     ↓
         * items
         */

        if (Array.isArray(response)) {
            items = response;
        } else if (Array.isArray(response?.data?.items)) {
            items = response.data.items;
        } else if (Array.isArray(response?.items)) {
            items = response.items;
        }

        /*
         * Convert WishlistItemResponse into the
         * product shape expected by the existing
         * Wishlist UI.
         *
         * Backend:
         *
         * id            = wishlist item ID
         * productId     = actual product ID
         * productName   = product name
         *
         * Frontend:
         *
         * id            = actual product ID
         * name          = product name
         */

        return items.map((item) => ({
            id: item.productId,
            wishlistItemId: item.id,

            name: item.productName,
            brand: item.brand,
            slug: item.slug,

            imageUrl: item.imageUrl,

            price: Number(item.price ?? 0),
            discountPercentage: Number(
                item.discount ?? 0
            ),
            discountedPrice: Number(
                item.discountedPrice ??
                item.price ??
                0
            ),

            /*
             * Wishlist response does not currently
             * contain category or variants.
             *
             * These will be populated separately
             * when required by the UI.
             */
            category: item.category ?? null,
            variants: item.variants ?? [],
        }));
    }, []);

    // ==========================================
    // LOAD WISHLIST FROM BACKEND
    // ==========================================

    const loadWishlist = useCallback(async () => {
        const token =
            localStorage.getItem("sneakx_token");

        if (!token) {
            resetWishlistState();
            return;
        }

        try {
            setWishlistLoading(true);
            setWishlistError(null);

            const response = await getWishlistApi();

            /*
             * Make sure the user did not logout
             * while the request was running.
             */
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
    }, [
        normalizeWishlist,
        resetWishlistState,
    ]);

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

        return () => {
            clearTimeout(timer);
        };
    }, [loadWishlist]);

    // ==========================================
    // AUTHENTICATION SYNCHRONIZATION
    // ==========================================

    useEffect(() => {
        const handleAuthChange = (event) => {
            const action =
                event?.detail?.action;

            // ----------------------------------
            // USER LOGGED IN
            // ----------------------------------

            if (action === "login") {
                setTimeout(() => {
                    loadWishlist();
                }, 0);

                return;
            }

            // ----------------------------------
            // USER LOGGED OUT
            // ----------------------------------

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
    }, [
        loadWishlist,
        resetWishlistState,
    ]);

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

            const normalizedWishlist =
                normalizeWishlist(response);

            setWishlistItems(normalizedWishlist);

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

    const removeFromWishlist = async (
        productId
    ) => {
        if (!productId) {
            return;
        }

        try {
            setWishlistError(null);

            const response =
                await removeFromWishlistApi(
                    productId
                );

            const normalizedWishlist =
                normalizeWishlist(response);

            setWishlistItems(normalizedWishlist);

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