import { Link } from "react-router-dom";

function CartEmpty() {
    return (
        <div className="text-center py-5">

            <h2 className="fw-bold">
                Your Cart is Empty
            </h2>

            <p className="text-muted mt-2">
                Looks like you haven't added any sneakers yet.
            </p>

            <Link
                to="/products"
                className="btn btn-dark mt-3"
            >
                Continue Shopping
            </Link>

        </div>
    );
}

export default CartEmpty;