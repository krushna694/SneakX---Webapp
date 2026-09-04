import { useState } from "react";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../hooks/useCart";

function ProductInfo({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        addToCart(product, quantity, selectedSize);

        alert("Product added to cart!");
    };

    return (
        <div>
            <p className="text-muted mb-2">
                {product.category}
            </p>

            <h1 className="fw-bold">
                {product.name}
            </h1>

            <h3 className="fw-bold mt-3">
                ₹{product.price}
            </h3>

            <p className="text-muted mt-3">
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

            <div className="d-grid gap-2 mt-4">
                <button
                    type="button"
                    className="btn btn-dark btn-lg"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>

                <button
                    type="button"
                    className="btn btn-outline-dark btn-lg"
                >
                    Add to Wishlist
                </button>
            </div>
        </div>
    );
}

export default ProductInfo;