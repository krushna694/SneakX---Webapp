import WishlistItem from "./WishlistItem";

function WishlistGrid({ products }) {
    return (
        <div className="row g-4">
            {products.map((product) => (
                <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={product.id}
                >
                    <WishlistItem product={product} />
                </div>
            ))}
        </div>
    );
}

export default WishlistGrid;