import { useCallback, useEffect, useState } from "react";
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
                response?.message || "Unable to load cart."
            );
        }

        const cart = response.data;

        const items = cart?.items || [];

        setCartItems(items);
        setCartTotal(Number(cart?.subtotal || 0));

    }, []);

    // ==========================================
    // LOAD CART
    // ==========================================

    const loadCart = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getCartApi();

            normalizeCart(response);

        } catch (err) {

            console.error("Load cart error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load cart."
            );

        } finally {

            setLoading(false);
        }

    }, [normalizeCart]);

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        const token = localStorage.getItem("sneakx_token");

        if (!token) {
            return;
        }

        const timer = setTimeout(() => {
            loadCart();
        }, 0);

        return () => {
            clearTimeout(timer);
        };

    }, [loadCart]);

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
                `Product variant is required for size ${size ?? "selected size"}.`
            );
        }

        try {

            setError("");

            const response = await addToCartApi({
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

            console.error("Add to cart error:", err);

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
            total + Number(item.quantity || 0),
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