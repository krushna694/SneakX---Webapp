import { useState } from "react";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1, size = null) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) =>
                    item.product.id === product.id &&
                    item.size === size
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id &&
                        item.size === size
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity,
                    size,
                },
            ];
        });
    };

    const removeFromCart = (productId, size) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        item.size === size
                    )
            )
        );
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) {
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId &&
                    item.size === size
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
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