import { useEffect, useState } from "react";
import { WishlistContext } from "./WishlistContext";

function WishlistProvider({ children }) {

    // Load wishlist from localStorage
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem("sneakx_wishlist");

        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist whenever it changes
    useEffect(() => {
        localStorage.setItem(
            "sneakx_wishlist",
            JSON.stringify(wishlistItems)
        );
    }, [wishlistItems]);

    // Add product to wishlist
    const addToWishlist = (product) => {
        setWishlistItems((currentItems) => {

            const alreadyExists = currentItems.some(
                (item) => item.id === product.id
            );

            if (alreadyExists) {
                return currentItems;
            }

            return [...currentItems, product];
        });
    };

    // Remove product from wishlist
    const removeFromWishlist = (productId) => {
        setWishlistItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    };

    // Check whether product is already in wishlist
    const isInWishlist = (productId) => {
        return wishlistItems.some(
            (item) => item.id === productId
        );
    };

    // Clear wishlist
    const clearWishlist = () => {
        setWishlistItems([]);
    };

    // Number of wishlist products
    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;