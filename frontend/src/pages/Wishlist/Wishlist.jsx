import { useWishlist } from "../../hooks/useWishlist";
import WishlistGrid from "../../components/wishlist/WishlistGrid";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";

function Wishlist() {
    const { wishlistItems, wishlistCount } = useWishlist();

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My Wishlist</h1>

                <span className="text-muted">
                    {wishlistCount} item
                    {wishlistCount !== 1 ? "s" : ""}
                </span>
            </div>

            {wishlistItems.length === 0 ? (
                <WishlistEmpty />
            ) : (
                <WishlistGrid products={wishlistItems} />
            )}

        </div>
    );
}

export default Wishlist;