import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { CartContext } from "./CartContext";

import {
    getCartApi,
    addToCartApi,
    updateCartItemApi,
    removeCartItemApi,
    clearCartApi,
} from "../api/cartApi";

function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // NORMALIZE BACKEND CART
    // ==========================================

    const normalizeCart = useCallback((response) => {

        if (!response?.success) {
            throw new Error(
                response?.message ||
                "Unable to load cart."
            );
        }

        const cart = response.data;

        const items = cart?.items || [];

        setCartItems(items);

        setCartTotal(
            Number(cart?.subtotal || 0)
        );

    }, []);

    // ==========================================
    // RESET CART STATE
    // ==========================================

    const resetCartState = useCallback(() => {

        setCartItems([]);

        setCartTotal(0);

        setError("");

    }, []);

    // ==========================================
    // LOAD CART
    // ==========================================

    const loadCart = useCallback(async () => {

        const token =
            localStorage.getItem(
                "sneakx_token"
            );

        if (!token) {
            resetCartState();
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response =
                await getCartApi();

            /*
             * Check again because the user could
             * have logged out while the request
             * was in progress.
             */

            const currentToken =
                localStorage.getItem(
                    "sneakx_token"
                );

            if (!currentToken) {
                resetCartState();
                return;
            }

            normalizeCart(response);

        } catch (err) {

            console.error(
                "Load cart error:",
                err
            );

            const tokenAfterError =
                localStorage.getItem(
                    "sneakx_token"
                );

            if (!tokenAfterError) {
                resetCartState();
                return;
            }

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load cart."
            );

        } finally {

            setLoading(false);
        }

    }, [
        normalizeCart,
        resetCartState,
    ]);

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        const token =
            localStorage.getItem(
                "sneakx_token"
            );

        /*
         * Initial cart state is already empty.
         * Nothing needs to be reset when the
         * user is not authenticated.
         */

        if (!token) {
            return;
        }

        const timer = setTimeout(() => {
            loadCart();
        }, 0);

        return () => {
            clearTimeout(timer);
        };

    }, [
        loadCart,
    ]);

    // ==========================================
    // AUTHENTICATION STATE SYNCHRONIZATION
    // ==========================================

    useEffect(() => {

        const handleAuthChange = (event) => {

            const action =
                event?.detail?.action;

            // ----------------------------------
            // USER LOGGED IN
            // ----------------------------------

            if (action === "login") {

                /*
                 * AuthProvider has already stored
                 * the JWT before dispatching this
                 * event.
                 */

                setTimeout(() => {
                    loadCart();
                }, 0);

                return;
            }

            // ----------------------------------
            // USER LOGGED OUT
            // ----------------------------------

            if (action === "logout") {

                resetCartState();
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
        loadCart,
        resetCartState,
    ]);

    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCart = async (
        product,
        quantity = 1,
        size = null,
        productVariantId = null
    ) => {

        if (!productVariantId) {

            throw new Error(
                `Product variant is required for size ${size ?? "selected size"
                }.`
            );
        }

        try {

            setError("");

            const response =
                await addToCartApi({
                    productVariantId,
                    quantity,
                });

            normalizeCart(response);

            return {
                success: true,
                message:
                    response.message ||
                    "Added to cart.",
            };

        } catch (err) {

            console.error(
                "Add to cart error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to add product to cart.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    // ==========================================
    // UPDATE QUANTITY
    // ==========================================

    const updateQuantity = async (
        cartItemId,
        quantity
    ) => {

        if (quantity < 1) {
            return;
        }

        try {

            setError("");

            const response =
                await updateCartItemApi(
                    cartItemId,
                    quantity
                );

            normalizeCart(response);

            return {
                success: true,
                message:
                    response.message ||
                    "Cart updated.",
            };

        } catch (err) {

            console.error(
                "Update cart error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to update cart.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    // ==========================================
    // REMOVE ITEM
    // ==========================================

    const removeFromCart = async (
        cartItemId
    ) => {

        try {

            setError("");

            const response =
                await removeCartItemApi(
                    cartItemId
                );

            normalizeCart(response);

            return {
                success: true,
                message:
                    response.message ||
                    "Item removed from cart.",
            };

        } catch (err) {

            console.error(
                "Remove cart item error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to remove cart item.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = async () => {

        try {

            setError("");

            const response =
                await clearCartApi();

            normalizeCart(response);

            return {
                success: true,
                message:
                    response.message ||
                    "Cart cleared.",
            };

        } catch (err) {

            console.error(
                "Clear cart error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to clear cart.";

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    // ==========================================
    // CART COUNT
    // ==========================================

    const cartCount = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.quantity || 0),
        0
    );

    // ==========================================
    // CONTEXT VALUE
    // ==========================================

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,

                loading,
                error,

                loadCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;