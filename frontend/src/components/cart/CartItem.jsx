import { useCart } from "../../hooks/useCart";

function CartItem({ item }) {
    const {
        updateQuantity,
        removeFromCart,
    } = useCart();

    const { product, quantity, size } = item;

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(product.id, size, quantity - 1);
        }
    };

    const handleIncrease = () => {
        updateQuantity(product.id, size, quantity + 1);
    };

    const handleRemove = () => {
        removeFromCart(product.id, size);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row align-items-center">

                    {/* Product Image */}
                    <div className="col-md-2">
                        <div className="bg-light rounded p-4 text-center">
                            <span className="text-muted">
                                Image
                            </span>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="col-md-4 mt-3 mt-md-0">
                        <h5 className="fw-bold mb-2">
                            {product.name}
                        </h5>

                        <p className="text-muted mb-1">
                            Size: {size}
                        </p>

                        <p className="fw-bold mb-0">
                            ₹{product.price}
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="col-md-3 mt-3 mt-md-0">
                        <div className="d-flex align-items-center gap-2">

                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={handleDecrease}
                            >
                                -
                            </button>

                            <span className="fw-bold px-2">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={handleIncrease}
                            >
                                +
                            </button>

                        </div>
                    </div>

                    {/* Total + Remove */}
                    <div className="col-md-3 text-md-end mt-3 mt-md-0">

                        <p className="fw-bold mb-2">
                            ₹{product.price * quantity}
                        </p>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleRemove}
                        >
                            Remove
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default CartItem;