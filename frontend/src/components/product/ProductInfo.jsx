import { useState } from "react";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function ProductInfo({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        addToCart(product, quantity, selectedSize);
        alert("Product added to cart!");
    };

    const handleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
            alert("Removed from wishlist.");
        } else {
            addToWishlist(product);
            alert("Added to wishlist!");
        }
    };

    return (
        <div className="product-info">

            <h1>{product.name}</h1>

            <h3>₹{product.price}</h3>

            <p>
                {product.description}
            </p>

            <SizeSelector
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
            />

            <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
            />

            <div className="mt-3 d-flex gap-2">

                <button
                    className="btn btn-dark"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>

                <button
                    className={`btn ${inWishlist
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                    onClick={handleWishlist}
                >
                    {inWishlist
                        ? "♥ Remove from Wishlist"
                        : "♡ Add to Wishlist"}
                </button>

            </div>

        </div>
    );
}

export default ProductInfo;