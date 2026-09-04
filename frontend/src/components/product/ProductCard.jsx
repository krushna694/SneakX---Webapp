import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="card h-100 shadow-sm border-0">

            {/* Product Image */}
            <div className="bg-light text-center p-5">
                <span className="text-muted">
                    Sneaker Image
                </span>
            </div>

            {/* Product Information */}
            <div className="card-body">

                <h5 className="card-title fw-bold">
                    {product.name}
                </h5>

                <p className="fw-bold mb-3">
                    ₹{product.price}
                </p>

                <Link
                    to={`/products/${product.id}`}
                    className="btn btn-dark w-100"
                >
                    View Product
                </Link>

            </div>
        </div>
    );
}

export default ProductCard;