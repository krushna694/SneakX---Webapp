import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function WishlistItem({ product }) {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Wishlist products don't have a selected size yet.
        // We will improve this later with a size selector.
        addToCart(product, 1, 9);

        alert("Product added to cart!");
    };

    const handleRemove = () => {
        removeFromWishlist(product.id);
    };

    return (
        <div className="card h-100">

            <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
            />

            <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                    {product.name}
                </h5>

                <p className="card-text text-muted">
                    {product.category}
                </p>

                <h6>
                    ₹{product.price}
                </h6>

                <div className="mt-auto pt-3 d-flex gap-2">

                    <button
                        className="btn btn-dark flex-grow-1"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>

                </div>

            </div>
        </div>
    );
}

export default WishlistItem;