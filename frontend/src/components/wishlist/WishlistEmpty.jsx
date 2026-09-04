import { Link } from "react-router-dom";

function WishlistEmpty() {
    return (
        <div className="text-center py-5">
            <h2>Your Wishlist is Empty</h2>

            <p className="text-muted">
                You haven't added any products to your wishlist yet.
            </p>

            <Link to="/products" className="btn btn-dark">
                Continue Shopping
            </Link>
        </div>
    );
}

export default WishlistEmpty;